import { Link } from "react-router-dom";
import { AuthFormProps } from "../../abstraction/types/authentication.types";
import { useDispatch } from "react-redux";
import { setUserType } from "../../data/store/user"; 

export const Welcome = ({ type, userType }: AuthFormProps) => {
  const dispatch = useDispatch();

  const handleRoleChange = (newUserType: "mentor" | "student") => {
    console.log(newUserType)
    dispatch(setUserType(newUserType));
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-neutral-800 text-left sm:text-2xl md:text-xl lg:text-2xl">
        {type === "Signin"
          ? `Hi, Welcome back ${userType === "mentor" ? "Knowledge Guru" : "Study Buddy"}!`
          : `Signup as a ${userType === "mentor" ? "Knowledge Guru" : "Study Buddy"}!`}
      </h1>
      {type === "Signin" ? (
        <p className="text-sm text-left text-gray-400 mt-2 sm:text-sm">
          Login now to view progress
          (or)
        </p>
      ) : (
        <p className="text-sm text-left text-gray-400 mt-2 sm:text-sm">
          Already have an account?{" "}
          <Link
            className={`${
              userType === "student"
                ? "text-studentAccent/75 hover:text-studentAccent"
                : "text-mentorAccent/75 hover:text-mentorAccent"
            } text-left font-semibold mt-2 sm:text-sm`}
            to="/signin"
          >
            Login
          </Link>
        </p>
      )}
      <p className="text-sm text-left text-gray-400 mt-2 sm:text-sm">
        Signup as{" "}
        {userType === "mentor" ? (
          <Link
            className={userType==="mentor" ? "text-mentorAccent/75 font-semibold hover:text-mentorAccent" :"text-studentAccent/75 font-semibold hover:text-studentAccent"}
            to="/signup"
            onClick={() => handleRoleChange("student")}
          >
            Student
          </Link>
        ) : (
          <Link
            className="text-studentAccent/75 font-semibold hover:text-studentAccent"
            to="/signup"
            onClick={() => handleRoleChange("mentor")}
          >
            Mentor
          </Link>
        )}
      </p>
    </div>
  );
};
