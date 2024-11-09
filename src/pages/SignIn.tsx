import { StudentIllustration } from "../features/authentication/components/StudentIllustration";
import { AuthForm } from "../features/authentication/components/AuthForm";
import { useSelector } from "react-redux";
import { MentorIllustration } from "../features/authentication/components/MentorIllustration";

export const SignIn = ({ type }: { type: "Signin" | "Signup" }) => {
    const userType = useSelector((state: any) => state.user.userType);
    console.log(userType);
    
    return (
        <div className={`flex justify-between items-center w-screen h-screen ${userType==="student" ? "bg-studentAccent/75" : "bg-mentorPrimary/75"} overflow-hidden`}>
            {userType === "mentor" ? <MentorIllustration /> : <StudentIllustration />}
            <div className="bg-white rounded w-full h-screen text-sm lg:w-full lg:h-screen lg:rounded-l-2xl xl:rounded-l-2xl md:w-7/12 md:p-4 md:rounded-lg md:mx-auto md:h-fit">
                <AuthForm type={type} userType={userType} />
            </div>
        </div>
    );
};
