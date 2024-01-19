// INBUILT IMPORTS
import { useState } from "react";
import { useDispatch } from "react-redux";

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
import { useNavigate } from "react-router-dom";
import { setStudentLoginInfo } from "../../../data/store/student";
import { setMentorLoginInfo } from "../../../data/store/mentor";




export const AuthForm = (props: { type: string; userType: string }) => {

  // state for our form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  //const mentor = useSelector((state: {mentor: {mentor: unknown}}) => state.mentor);

  const navigate = useNavigate();

  
  const handleMentorSignIn = () => {
    console.log("mentor sign in API call happens here",email,password);
    dispatch(setMentorLoginInfo({email:email}))
  };

  const handleMentorSignUp = () => {
    console.log("mentor sign up API call happens here");
    dispatch(setMentorLoginInfo({email:email}))
    navigate('/mentordetails');
  };

  const handleStundentSignIn = () => {
    console.log("student sign in API call happens here");
    dispatch(setStudentLoginInfo({email:email}))
    navigate('/studentdetails');

  };

  const handleStundentSignUp = () => {
    console.log("student sign up API call happens here");
    dispatch(setStudentLoginInfo({email:email}));
    navigate('/studentdetails');
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
    <div className="text-white xl:w-9/12 xl:mt-28 lg:mt-12 md:w-9/12 w-11/12 mx-auto md:mt-0">
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
          additionalStyling="flex rounded-md bg-bluefill shadow-sm ring-1 ring-inset ring-gray-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
        />
        <Button
          Icon={<FaGithubAlt className="w-8 sm:w-5" />}
          onClick={props.type==='Signin' ? handleGithubSignin : handleGithubSignup}
          buttonText={
            props.type === "Signin"
              ? "Sign in with Github"
              : "Sign up with Github"
          }
          additionalStyling="flex rounded-md bg-bluefill shadow-sm ring-1 ring-inset ring-gray-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md ml-2"
        />
      </div>
      <div className="flex items-center mt-8">
        <div className="border-b border-gray-600 flex-grow mr-4"></div>
        <div className="text-gray-400">or</div>
        <div className="border-b border-gray-600 flex-grow ml-4"></div>
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
        additionalStyling={`bg-purple-600 text-white shadow-lg drop-shadow-md shadow-purple-600 lg:p-4 ${props.type === "Signin" ? "mt-12" : "mt-16"}`}
      />
      {props.type === "Signin" ? (
        <NotRegisteredYet />
      ) : (
        <p className="text-xs text-right text-gray-400 mt-6 sm:text-sm">
          By joining I agree to the terms and conditions
        </p>
      )}
    </div>
  );
};
