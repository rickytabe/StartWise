// services/storage.ts
export const uploadFile = async (file: File, _folder: string): Promise<string> => {
    // For Cloudinary implementation:
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'mentor_uploads');
    
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Upload failed:', error);
      throw new Error('File upload failed');
    }
  };