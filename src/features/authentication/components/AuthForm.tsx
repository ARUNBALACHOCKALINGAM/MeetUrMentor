// INBUILT IMPORTS
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// EXTERNAL IMPORTS
import { FaGithubAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";

// INTERNAL COMPONENTS
import { Input } from "../../../components/form/Input";
import { Button } from "../../../components/ui/Button";
import { Welcome } from "../../../components/ui/Welcome";
import { RememberSection } from "../../../components/form/RememberSection";
import { NotRegisteredYet } from "../../../components/form/NotRegisteredYet";
import { setStudentLoginInfo } from "../../../data/store/student";
import { setMentorLoginInfo } from "../../../data/store/mentor";
import { AuthFormProps } from "../../../abstraction/types/authentication.types";



export const AuthForm = ({ type, userType }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validation functions
  const validateEmail = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };

  // Event handlers based on user type
  const handleSignIn = () => {
    if (userType === "student") {
      console.log("student sign in API call");
      dispatch(setStudentLoginInfo({ email }));
      navigate("/details");
    } else {
      console.log("mentor sign in API call");
      dispatch(setMentorLoginInfo({ email }));
      navigate("/details");
    }
  };

  const handleSignUp = () => {
    if (userType === "student") {
      console.log("student sign up API call");
      dispatch(setStudentLoginInfo({ email }));
      navigate("/details");
    } else {
      console.log("mentor sign up API call");
      dispatch(setMentorLoginInfo({ email }));
      navigate("/details");
    }
  };

  return (
    <div className={`h-full xl:w-9/12 md:w-9/12 w-11/12 mx-auto md:mt-0 ${type==="Signin" ? "lg:mt-[6.5%]" : "lg:mt-[12.5%]"}`}>
      <Welcome userType={userType} type={type} />

      <div className="flex justify-between w-full mt-4">
        <Button
          Icon={<FcGoogle className="w-8 sm:w-5" />}
          onClick={type === "Signin" ? handleSignIn : handleSignUp}
          buttonText={type === "Signin" ? "Sign in with Google" : "Sign up with Google"}
          additionalStyling="border-2 custom-width-45 mr-2 text-2xl"
        />
        <Button
          Icon={<FaGithubAlt className="w-20 sm:w-5" />}
          onClick={type === "Signin" ? handleSignIn : handleSignUp}
          buttonText={type === "Signin" ? "Sign in with Github" : "Sign up with Github"}
          additionalStyling="border-2 bg-white text-black custom-width-45 ml-2"
        />
      </div>

      <div className="flex items-center mt-8">
        <div className="border-b border-gray-300 flex-grow mr-4"></div>
        <div className="text-gray-500">or</div>
        <div className="border-b border-gray-300 flex-grow ml-4"></div>
      </div>

      <Input
        labelText="Email"
        placeholder="Email"
        Icon={<AiOutlineMail />}
        type="email"
        value={email}
        errorMessage={emailError}
        onChange={setEmail}
        onBlur={validateEmail}
      />

      {type === "Signin" && (
        <Input
          labelText="Password"
          placeholder="Password"
          Icon={<AiOutlineLock />}
          type="password"
          value={password}
          errorMessage={passwordError}
          onChange={setPassword}
          onBlur={validatePassword}
        />
      )}

      {type === "Signin" && <RememberSection userType={userType} />}

      <Button
        buttonText={type === "Signin" ? "Sign in" : "Continue"}
        onClick={type === "Signin" ? handleSignIn : handleSignUp}
        additionalStyling={`${userType === "student" ? "bg-studentPrimary" : "bg-mentorPrimary"} text-white font-semibold shadow-lg drop-shadow-md lg:p-4 mt-14`}
      />

      {type === "Signin" ? (
        <NotRegisteredYet userType={userType} />
      ) : (
        <p className="text-xs text-center text-gray-400 mt-8 sm:text-sm">
          By joining, I agree to the terms and conditions.
        </p>
      )}
    </div>
  );
};
