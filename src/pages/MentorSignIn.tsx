import { MentorIllustration } from "../features/authentication/components/MentorIllustration";
import { SignInForm } from "../features/authentication/components/MentorSignIn/SignInForm";

export const MentorSignIn = () => {
  return (
    <div className="flex justify-between items-center w-screen h-screen bg-amber-400/50 overflow-hidden">
      <MentorIllustration />
      <div className="bg-white rounded w-full h-screen text-sm lg:w-full lg:h-screen lg:rounded-l-2xl xl:rounded-l-2xl md:w-7/12 md:p-4 md:rounded-lg md:mx-auto md:h-fit">
        <SignInForm />
      </div>
    </div>
  );
};
