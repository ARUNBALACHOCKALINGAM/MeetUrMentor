import { StudentIllustration } from "../features/authentication/components/StudentIllustration";
import { AuthForm } from "../features/authentication/components/AuthForm";

export const StudentSignUp = () => {
  return (
    <div className="flex justify-between items-center w-screen h-screen bg-blue-400/75 overflow-hidden">
      <StudentIllustration />
      <div className="bg-white rounded w-full h-screen text-sm lg:w-full lg:h-screen lg:rounded-l-2xl xl:rounded-l-2xl md:w-7/12 md:p-4 md:rounded-lg md:mx-auto md:h-fit">
        <AuthForm type='Signup' userType="Student"/>
      </div>
    </div>
  );
};
