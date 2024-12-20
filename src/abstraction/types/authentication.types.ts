// Props type definitions
export interface AuthFormProps {
    type?: "Signin" | "Signup";
    userType?: "student" | "mentor";
    forgotPassword?: boolean;
    reset?:boolean;
}