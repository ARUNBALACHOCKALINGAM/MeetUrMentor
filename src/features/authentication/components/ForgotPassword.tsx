import { useState, useEffect } from "react";
import { Input } from "../../../components/form/Input";
import { Button } from "../../../components/ui/Button";
import { AiOutlineMail } from "react-icons/ai";
import { AuthFormProps } from "../../../abstraction/types/authentication.types";
import { Link } from "react-router-dom";

export const ForgotPassword = ({ userType }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resendEnabled, setResendEnabled] = useState(false);


  useEffect(() => {
    if (resetMessage) {
      const timer = setTimeout(() => setResendEnabled(true), 30000); // Enable resend after 30 seconds
      return () => clearTimeout(timer);
    }
  }, [resetMessage]);

  const handleResetPassword = () => {
    if (emailError || !email) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // Simulate email sending by dispatching action or calling API here
    console.log("Reset password for", email);

    setResetMessage("Check your inbox for a password reset link.");
    setResendEnabled(false); // Disable resend initially
  };

  const handleResendLink = () => {
    setResetMessage("A new reset link has been sent to your email.");
    setResendEnabled(false);
    console.log("Resend reset password link to", email);
  };

  const validateEmail = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  return (
    <div className="mt-[30%] h-full xl:w-9/12 xl:mt-60 lg:mt-52 md:w-9/12 w-11/12 mx-auto md:mt-0">
      <h2 className="text-xl font-semibold text-neutral-800 text-left sm:text-2xl md:text-xl lg:text-2xl">Forgot Password</h2>
      <p className="text-sm text-left text-gray-400 mt-2 sm:text-sm">Enter your email to reset your password</p>

      <Input
        labelText="Email"
        placeholder="Email"
        type="email"
        value={email}
        errorMessage={emailError}
        onChange={setEmail}
        onBlur={validateEmail}
        Icon={<AiOutlineMail />} field={""}      />

      <div className="w-full mb-4">
        <Link
          className={`text-left ${userType === "mentor" ? "text-mentorAccent/75 font-semibold hover:text-mentorAccent" : "text-studentAccent/75 font-semibold hover:text-studentAccent"}`}
          to="/"
        >
          Go back
        </Link>
      </div>

      <Button
        buttonText="Reset Password"
        onClick={handleResetPassword}
        additionalStyling={`${userType === "mentor" ? "bg-mentorAccent" : "bg-studentPrimary"} text-white font-semibold mt-4`}
        disabled={!email || !!emailError || !!resetMessage}
      />

      {resetMessage && (
        <p className={`text-center ${userType === "mentor" ? "text-mentorAccent" : "text-studentPrimary"} mt-4`}>
          {resetMessage}
        </p>
      )}

      {resetMessage && resendEnabled && (
        <div className={`text-center ${userType === "mentor" ? "text-mentorAccent" : "text-studentPrimary"} mt-4`}>
          <p className="text-sm mb-2">Didn't receive the link? 
             
            { } 
            <button
              onClick={handleResendLink}
              className={`font-semibold ml-2 ${userType === "mentor" ? "text-mentorAccent hover:text-mentorAccent/75" : "text-studentAccent hover:text-studentAccent/75"}`}
            >
               Resend Link
            </button>
          </p>

        </div>
      )}
    </div>
  );
};
