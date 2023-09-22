// INBUILT IMPORTS
import { useState } from "react";

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




export const AuthForm = (props: { type: string; userType: string }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  
  const handleMentorSignIn = () => {
    console.log("mentor sign in API call happens here",email,password);
  };

  const handleMentorSignUp = () => {
    console.log("mentor sign up API call happens here");
  };

  const handleStundentSignIn = () => {
    console.log("student sign in API call happens here");
  };

  const handleStundentSignUp = () => {
    console.log("student sign up API call happens here");
  };

  function handleGoogleSignin(): void {
   console.log("Function not implemented.");
  }

  function handleGoogleSignup(): void {
    console.log("Function not implemented.");
   }

  function handleGithubSignin(): void {
    console.log("Function not implemented.");
   }

   function handleGithubSignup(): void {
    console.log("Function not implemented.");
   }

  return (
    <div className="mt-24 xl:w-9/12 xl:mt-28 lg:mt-12 md:w-9/12 w-11/12 mx-auto md:mt-0">
      <Welcome userType={props.userType} type={props.type} />
      <div className="flex justify-between w-full">
        <Button
          Icon={<FcGoogle className="w-8 sm:w-5" />}
          onClick={props.type==='Signin' ? handleGoogleSignin : handleGoogleSignup}
          buttonText={
            props.type === "Signin"
              ? "Sign in with Google"
              : "Sign up with Google"
          }
          additionalStyling="border-2 custom-width-45 mr-2"
        />
        <Button
          Icon={<FaGithubAlt className="w-8 sm:w-5" />}
          onClick={props.type==='Signin' ? handleGithubSignin : handleGithubSignup}
          buttonText={
            props.type === "Signin"
              ? "Sign in with Github"
              : "Sign up with Github"
          }
          additionalStyling="border-2 bg-black custom-width-45 text-white ml-2"
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
        onBlur={() => {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError("Invalid email address");
          } else {
            setEmailError(""); // Reset error message
          }
        }}
      />
      {props.type === "Signin" ? (
        <Input
          labelText="Password"
          placeholder="Password"
          Icon={<AiOutlineLock />}
          type="password"
          value={password}
          errorMessage={passwordError}
          onChange={setPassword}
          onBlur={() => {
            if (password.length < 8) {
              setPasswordError("Password must be at least 8 characters long");
            } else {
              setPasswordError(""); // Reset error message
            }
          }}
        />
      ) : (
        ""
      )}
      {props.type === "Signin" ? <RememberSection /> : ""}
      <Button
        buttonText={props.type === "Signin" ? "Sign in" : "Continue"}
        onClick={
          props.userType === "Student"
            ? props.type === "Signin"
              ? handleStundentSignIn
              : handleStundentSignUp
            : props.type === "Signin"
            ? handleMentorSignIn
            : handleMentorSignUp
        }
        additionalStyling="bg-orangejuice text-white shadow-lg drop-shadow-md shadow-orangejuice lg:p-4 mt-12"
      />
      {props.type === "Signin" ? (
        <NotRegisteredYet />
      ) : (
        <p className="text-xs text-center text-gray-400 mt-8 sm:text-sm">
          By joining I agree to the terms and conditions
        </p>
      )}
    </div>
  );
};
