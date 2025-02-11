export type Message = {
    message: string;
    sender: "mentor" | "student";
    senderUserType?:"mentor" | "student";  // Restrict sender to known keys
  };
  
  
  // Props for the Chat component
  export type ChatProps = {
    userType: "mentor" | "student"; // User type determining styling
  };
  