// INBUILT IMPORTS
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// EXTERNAL IMPORTS
import { FaGithubAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { auth, githubAuthProvider, googleAuthProvider } from '../../../firebase';

// INTERNAL COMPONENTS
import { Input } from "../../../components/form/Input";
import { Button } from "../../../components/ui/Button";
import { Welcome } from "../../../components/ui/Welcome";
import { RememberSection } from "../../../components/form/RememberSection";
import { NotRegisteredYet } from "../../../components/form/NotRegisteredYet";
import { AuthFormProps } from "../../../abstraction/types/authentication.types";
import { signInWithPopup } from "firebase/auth";
import axiosAuth from "../../../utils/axiosInstance";


//REDUX
import {loginSuccess, loginFailed, registerSuccess, registerFailed, setUserLoginInfo} from "../../../data/store/user";



export const AuthForm = ({ type, userType }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message,setMessage] = useState('');

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

  const handleSignIn = async () => {
    try {
      const result = await axiosAuth.post("/auth/login", {
        email: email,
        password: password,
        userType:userType
      });

      dispatch(setUserLoginInfo({email:email,userType:userType}));
  
      if (result.status === 200) {
        localStorage.setItem("email", result.data?.email);
        localStorage.setItem("userType", result.data?.userType);
        dispatch(loginSuccess()); // Dispatch login success action
        navigate("/home"); // Navigate after the modal closes
      }
    } catch (error:any) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data?.message || "Login Failed. Please check your credentials";
        dispatch(loginFailed({ message: errorMessage })); // Dispatch login failed action with backend message
      } else {
        dispatch(loginFailed({ message: "An unexpected error occurred. Please try again." }));
      }
      console.error("Login error:", error);
    }
  };


  // Event handlers based on user type
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      localStorage.setItem('token', result.user.getIdToken().toString());
      localStorage.setItem('user', JSON.stringify(result.user));
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };
  // Event handlers based on user type
  const handleGithubSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, githubAuthProvider);
      localStorage.setItem('token', result.user.getIdToken().toString());
      localStorage.setItem('user', JSON.stringify(result.user));
      navigate('/home');
    } catch (error) {

      console.log(error);
    }
  };



  const handleSignUp = async () => {
    dispatch(setUserLoginInfo({email:email,userType:userType}));
    try {
      const result = await axiosAuth.post("/auth/register", {
        email: email,
        password: password,
        usertype:userType
      });

      console.log(result.data);

      // If registration is successful
      if (result.status === 200) {
        localStorage.setItem("email", result.data?.email);
        localStorage.setItem("userType", result.data?.userType);
        dispatch(registerSuccess()); // Dispatch register success action
        navigate("/details"); // Navigate to the details page
      }

    } catch (error:any) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data?.message || "Registration Failed. Please check your credentials";
        dispatch(registerFailed({ message: errorMessage })); // Dispatch login failed action with backend message
      } else {
        dispatch(registerFailed({ message: "An unexpected error occurred. Please try again." }));
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className={`h-full xl:w-9/12 md:w-9/12 w-11/12 mx-auto md:mt-0 ${type === "Signin" ? "lg:mt-[6.5%]" : "lg:mt-[12.5%]"}`}>
      <Welcome userType={userType} type={type} />

      <div className="flex justify-between w-full mt-4">
        <Button
          Icon={<FcGoogle className="w-8 sm:w-5" />}
          onClick={handleGoogleSignIn}
          buttonText={type === "Signin" ? "Sign in with Google" : "Sign up with Google"}
          additionalStyling="border-2 custom-width-45 mr-2 text-2xl"
        />
        <Button
          Icon={<FaGithubAlt className="w-20 sm:w-5" />}
          onClick={handleGithubSignIn}
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
