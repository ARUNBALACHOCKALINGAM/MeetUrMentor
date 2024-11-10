import { StudentIllustration } from "../features/authentication/components/StudentIllustration";
import { AuthForm } from "../features/authentication/components/AuthForm";
import { useSelector } from "react-redux";
import { MentorIllustration } from "../features/authentication/components/MentorIllustration";
import { ForgotPassword } from "../features/authentication/components/ForgotPassword";
import { AuthFormProps } from "../abstraction/types/authentication.types";
import { ResetPassword } from "../features/authentication/components/ResetPassword";

export const AuthPage = ({ type,forgotPassword=false,reset=false}: AuthFormProps) => {
    const userType = useSelector((state: any) => state.user.userType);
    console.log(userType);
    
    return (
        <div className={`flex justify-between items-center w-screen h-screen ${userType==="student" ? "bg-studentAccent/75" : "bg-mentorPrimary/75"} overflow-hidden`}>
            {userType === "mentor" ? <MentorIllustration /> : <StudentIllustration />}
            <div className="bg-white rounded w-full h-screen text-sm lg:w-full lg:h-screen lg:rounded-l-2xl xl:rounded-l-2xl md:w-8/12 md:p-4 md:py-10 md:rounded-lg md:mx-auto md:h-fit">
                {reset ? <ResetPassword/> : forgotPassword ? <ForgotPassword userType={userType}/> : <AuthForm type={type} userType={userType} />}
            </div>
        </div>
    );
};
