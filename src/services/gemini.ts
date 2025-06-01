import { GoogleGenAI, Modality } from "@google/genai";
import { extractPDFText } from "../Utils/pdfParser";

const API_KEY = import.meta.env.VITE_APP_GEMINI_API_URL;

const SYSTEM_PROMPT = `You are an AI teaching assistant for StartWise, a mentorship and internship platform. Your role is to:

1. Help beginners understand how to:
   - Find and connect with top mentors in their field
   - Apply for internship opportunities
   - Make the most of their mentorship sessions
   - Navigate the StartWise platform effectively

2. Provide guidance on:
   - Career development and skill building
   - Preparing for mentorship sessions
   - Creating effective portfolios and resumes
   - Professional communication with mentors
   - Internship application best practices

3. Always:
   - Use beginner-friendly language
   - Provide step-by-step explanations
   - Include practical examples
   - Reference StartWise platform features when relevant
   - Encourage professional growth and learning

4. Remember that you are part of the StartWise ecosystem, helping users maximize their learning and career opportunities through mentorship and internships.`;

export type Message = {
    content: string;
    isUser: boolean;
    attachments?: Array<{
      name: string;
      type: string;
      data?: string; // Base64 data without prefix
    }>;
    displayedContent?: string;
    images?: string[];
  };
  
  export type GeminiResponse = {
    candidates: Array<{
      content: {
        parts: Array<{
          text?: string;
          inlineData?: {
            mimeType: string;
            data: string;
          };
        }>;
      };
      groundingMetadata?: {
        webSearchQueries?: string[];
        searchResults?: Array<{
          url: string;
          title: string;
          snippet: string;
        }>;
      };
    }>;
  };
  
  
  export interface ChatSession {
    id: string;
    name: string;
    messages: Message[];
    selectedModel:string;
    createdAt: number; // Timestamp for sorting or display
  }

const convertToBase64 = (file: File): Promise<string> => 
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      resolve(result.split(",")[1]); // Remove data URL prefix
    };
    reader.readAsDataURL(file);
  });

export const generateResponse = async (
  prompt: string,
  attachments: File[],
  selectedModel: string,
  messages: Message[],
) => {
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    // Add system prompt as the first message if this is a new conversation
    const contents = messages.length === 0 ? [
      {
        role: "model",
        parts: [{ text: SYSTEM_PROMPT }]
      }
    ] : [];

    // Add conversation history
    contents.push(...messages.map(msg => ({
      role: msg.isUser ? "user" : "model",
      parts: [
        { text: msg.content },
        ...(msg.attachments?.map(attachment => 
          attachment.data 
            ? { text: "" , inlineData: { mimeType: attachment.type, data: attachment.data }}
            : { text: `[${attachment.type}] ${attachment.name}` }
        ) || [])
      ]
    })));

    // Process current attachments
    const currentParts = await Promise.all(attachments.map(async (file) => {
      if (file.type === "application/pdf") {
        const text = await extractPDFText(file);
        return { text: `[PDF] ${text.substring(0, 1000)}...` };
      }
      if (file.type.startsWith("image/")) {
        const data = await convertToBase64(file);
        return { inlineData: { mimeType: file.type, data } };
      }
      return { text: `[${file.type}] ${file.name}` };
    }));

    // Add current message
    contents.push({
      role: "user",
      parts: [
        { text: prompt },
        ...currentParts.map(part => ({ ...part, text: part.text || "" }))
      ]
    });

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents,
      config: {
        responseModalities: selectedModel.toLowerCase().includes("image")
          ? [Modality.TEXT, Modality.IMAGE]
          : [Modality.TEXT],
          maxOutputTokens: 100000,
          temperature: 1
      },
    });

    return parseGeminiResponse(response);

  } catch (error) {
    console.error("API Error:", error);
    return {
      text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      images: []
    };
  }
};

const parseGeminiResponse = (response:any) => {
  if (!response.candidates?.[0]?.content?.parts) {
    return { text: "No valid response generated", images: [] };
  }

  return response.candidates[0].content.parts.reduce((acc:any, part: any) => ({
    text: acc.text + (part.text || ""),
    images: [
      ...acc.images,
      ...(part.inlineData ? [
        `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`
      ] : [])
    ]
  }), { text: "", images: [] as string[] });
};