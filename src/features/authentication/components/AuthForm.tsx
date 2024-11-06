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
    <div className={`mt-[30%] h-full xl:w-9/12 xl:${props.userType==="Student" ? (props.type==="Signin" ? "mt-60" : "mt-60") : "mt-28"} lg:mt-60 md:w-9/12 w-11/12 mx-auto md:mt-0`}>
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
          additionalStyling="border-2 custom-width-45 mr-2 text-2xl"
        />
        <Button
          Icon={<FaGithubAlt className="w-20 sm:w-5" />}
          onClick={props.type==='Signin' ? handleGithubSignin : handleGithubSignup}
          buttonText={
            props.type === "Signin"
              ? "Sign in with Github"
              : "Sign up with Github"
          }
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
      {props.type === "Signin" ? <RememberSection userType={props.userType} /> : ""}
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
        additionalStyling={`${props.userType==="Student" ? 'bg-studentPrimary shadow-studentPrimary' : 'bg-mentorPrimary'} text-white font-semibold shadow-lg drop-shadow-md shadow-mentorPrimary lg:p-4 mt-14`}
      />
      {props.type === "Signin" ? (
        <NotRegisteredYet userType={props.userType}/>
      ) : (
        <p className="text-xs text-center text-gray-400 mt-8 sm:text-sm">
          By joining I agree to the terms and conditions
        </p>
      )}
    </div>
  );
};
