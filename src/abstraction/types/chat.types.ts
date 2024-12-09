export type Message = {
    text: string;
    sender: "mentor" | "student"; // Restrict sender to known keys
  };
  
  
  // Props for the Chat component
  export type ChatProps = {
    userType: "mentor" | "student"; // User type determining styling
  };
  