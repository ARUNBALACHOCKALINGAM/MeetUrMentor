import { Link } from "react-router-dom";

export const Welcome = (props: { type: string; userType: string }) => {
  return (
    <div>
      <h1 className="text-lg bg-gradient-to-b from-amber-50 to-purple-500 bg-clip-text font-bold text-transparent text-left md:text-2xl sm:text-xl">
        {props.type === "Signin"
          ? `Hi, Welcome back ${props.userType}!`
          : `SIGNUP AS A ${props.userType.toUpperCase()}`}
      </h1>
      {props.type === "Signin" ? (
        <p className="text-xs text-left text-gray-400 mt-2 sm:text-sm">
          Login now to view progress
          (or)
        </p>
      ) : (
        <p className="text-xs text-left text-gray-400 mt-2 sm:text-sm">
          Already have an account?{" "}
          <Link
            to={`${
              props.userType === "Mentor" ? "/mentorsignin" : "/studentsignin"
            }`}
          >
            Login
          </Link>
        </p>
      )}
      <p className="text-xs text-left text-gray-400 mt-2 sm:text-sm">
        Signup as {props.userType === "Mentor" ? <Link to="/studentsignup">student</Link> : <Link to="/mentorsignup">mentor</Link>} 
      </p>
    </div>
  );
};
