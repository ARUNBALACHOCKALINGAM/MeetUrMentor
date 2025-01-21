import { useState, useEffect } from "react";
import { Input } from "../../../components/form/Input";
import { Button } from "../../../components/ui/Button";
import { AiOutlineMail } from "react-icons/ai";
import { AuthFormProps } from "../../../abstraction/types/authentication.types";
import { Link } from "react-router-dom";

export const ForgotPassword = ({ userType }: AuthFormProps) => {
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [resendEnabled, setResendEnabled] = useState(false);


  useEffect(() => {
    if (otpMessage) {
      const timer = setTimeout(() => setResendEnabled(true), 30000); // Enable resend after 30 seconds
      return () => clearTimeout(timer);
    }
  }, [otpMessage]);

  const handleResetPassword = () => {
    if (otpError || !otp) {
      setOtpError("Please enter a valid otp.");
      return;
    }

    setOtpMessage("Check your inbox for the otp.");
    setResendEnabled(false); // Disable resend initially
  };

  const handleResendLink = () => {
    setOtpMessage("A new reset link has been sent to your otp.");
    setResendEnabled(false);
    console.log("Resend reset password link to", otp);
  };

  const validateEmail = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(otp)) {
      setOtpError("Invalid otp address");
    } else {
      setOtpError("");
    }
  };

  return (
    <div className="mt-[30%] h-full xl:w-9/12 xl:mt-60 lg:mt-52 md:w-9/12 w-11/12 mx-auto md:mt-0">
      <h2 className="text-xl font-semibold text-neutral-800 text-left sm:text-2xl md:text-xl lg:text-2xl">Email Verification</h2>
      <p className="text-sm text-left text-gray-400 mt-2 sm:text-sm">Enter your otp</p>

      <Input
        labelText="OTP"
        placeholder="otp"
        type="text"
        value={otp}
        errorMessage={otpError}
        onChange={setOtp}
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
        disabled={!otp || !!otpError || !!otpMessage}
      />

      {otpMessage && (
        <p className={`text-center ${userType === "mentor" ? "text-mentorAccent" : "text-studentPrimary"} mt-4`}>
          {otpMessage}
        </p>
      )}

      {otpMessage && resendEnabled && (
        <div className={`text-center ${userType === "mentor" ? "text-mentorAccent" : "text-studentPrimary"} mt-4`}>
          <p className="text-sm mb-2">Didn't receive the otp? 
             
            { } 
            <button
              onClick={handleResendLink}
              className={`font-semibold ml-2 ${userType === "mentor" ? "text-mentorAccent hover:text-mentorAccent/75" : "text-studentAccent hover:text-studentAccent/75"}`}
            >
               Resend Otp
            </button>
          </p>

        </div>
      )}
    </div>
  );
};
