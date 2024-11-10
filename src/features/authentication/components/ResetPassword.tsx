import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "../../../components/form/Input";
import { Button } from "../../../components/ui/Button";
import { AuthFormProps } from "../../../abstraction/types/authentication.types";
import { Link } from "react-router-dom";
import { AiOutlineLock } from "react-icons/ai";

export const ResetPassword = ({ userType }: AuthFormProps) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError,setNewPasswordError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();

  const validatePassword = () => {
    if (newPassword.length < 8) {
      setNewPasswordError("Password must be at least 8 characters long");
    } else {
      setNewPasswordError("");
    }
  };


  const handleSetNewPassword = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");
    console.log("New password set:", newPassword);
    // Dispatch action to update password or call API
  };

  return (
    <div className="mt-[30%] h-full xl:w-9/12 xl:mt-60 lg:mt-52 md:w-9/12 w-11/12 mx-auto md:mt-0">
      <h2 className="text-xl font-semibold text-neutral-800 text-left sm:text-2xl md:text-xl lg:text-2xl">Set New Password</h2>
      <p className="text-sm text-left text-gray-400 mt-2 sm:text-sm">
        Enter your new password below.
      </p>

      <Input
        labelText="New Password"
        placeholder="Enter new password"
        type="password"
        value={newPassword}
        errorMessage={newPasswordError}
        onChange={setNewPassword}
        Icon={<AiOutlineLock />}
        onBlur={validatePassword}
      />

      <Input
        labelText="Confirm Password"
        placeholder="Confirm new password"
        type="password"
        value={confirmPassword}
        errorMessage={passwordError}
        onChange={setConfirmPassword}
        Icon={<AiOutlineLock />}
        onBlur={validatePassword}
      />

      <div className="w-full">
        <Link
          className={`text-left ${userType === "mentor" ? "text-mentorAccent/75 font-semibold hover:text-mentorAccent" : "text-studentAccent/75 font-semibold hover:text-studentAccent"}`}
          to="/forgotpassword"
        >
          Go back
        </Link>
      </div>

      <Button
        buttonText="Continue"
        onClick={handleSetNewPassword}
        additionalStyling={`${userType === "mentor" ? "bg-mentorAccent" : "bg-studentAccent"} text-white font-semibold mt-4`}
      />
    </div>
  );
};
