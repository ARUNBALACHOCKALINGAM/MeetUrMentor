import { MentorIllustration } from "../features/authentication/components/MentorIllustration";
import { SignInForm } from "../features/authentication/components/MentorSignIn/SignInForm";

export const MentorSignIn = () => {
  return (
    <div className="flex justify-between items-center w-screen h-screen bg-amber-400/50 overflow-hidden">
      <MentorIllustration />
      <div className="lg:w-full lg:rounded-l-2xl xl:rounded-l-2xl sm: text-sm bg-white w-full h-screen">
        <SignInForm />
      </div>
    </div>
  );
};
