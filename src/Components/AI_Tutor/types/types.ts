export interface ChatSession {
    id: string;
    name: string;
    messages: Message[];
    selectedModel: string;
    createdAt: number;
  }
  
  export interface Message {
    displayedContent: any;
    content: string;
    isUser: boolean;
    attachments?: Array<{
      name: string;
      type: string;
    }>;
    images?: string[];
  }
  
  export interface ChatInterfaceProps {
    initialSessions?: ChatSession[];
  }