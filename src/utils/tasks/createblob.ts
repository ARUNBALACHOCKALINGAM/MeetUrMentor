const createBlobUrl = (data: any, type: string): string => {
    try {
      if (typeof data === "string") {
        // Check if the data is a base64-encoded string with a MIME type
        const base64Regex = /^data:(.*);base64,/;
        const matches = data.match(base64Regex);
        
        if (matches) {
          type = matches[1]; // Extract correct MIME type
          data = data.replace(base64Regex, ""); // Remove data URL prefix
        }
  
        // Decode Base64 string
        const byteCharacters = atob(data);
        const byteNumbers = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
  
        const blob = new Blob([byteNumbers], { type });
        return URL.createObjectURL(blob);
      } 
      
      else if (data instanceof Blob) {
        // If data is already a Blob
        return URL.createObjectURL(data);
      } 
      
      else if (data instanceof ArrayBuffer) {
        // Convert ArrayBuffer to Blob
        const blob = new Blob([data], { type });
        return URL.createObjectURL(blob);
      }
  
      console.error("Unsupported file format:", data);
      return "";
    } catch (error) {
      console.error("Error creating blob URL:", error);
      return "";
    }
  };
  
  export default createBlobUrl;
  