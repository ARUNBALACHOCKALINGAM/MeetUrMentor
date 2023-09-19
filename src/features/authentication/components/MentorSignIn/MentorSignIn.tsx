import { AiOutlineMail } from "react-icons/ai";

// Component imports
import { Input } from "../../../../components/form/Input";

export const MentorSignIn = () => {
  return (
    <div>
      <Input
        labelText="Email"
        placeholder="email"
        Icon={<AiOutlineMail />}
        error=""
        type="email"
      />
    </div>
  );
};
