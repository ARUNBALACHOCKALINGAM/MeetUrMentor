import { Link } from "react-router-dom";

export const Welcome = (props: { type: string; userType: string }) => {
  return (
    <div>
      <h1 className="text-xl font-semibold text-neutral-800 text-left sm:text-2xl md:text-xl lg:text-2xl">
        {props.type === "Signin"
          ? `Hi, Welcome back ${props.userType==="Mentor" ? "Knowledge Guru" : "Study Buddy"}!`
          : `Signup as a ${props.userType==="Mentor" ? "Knowledge Guru" : "Study Buddy"}!`}
      </h1>
      {props.type === "Signin" ? (
        <p className="text-sm text-left text-gray-400 mt-2 sm:text-sm">
          Login now to view progress
          (or)
        </p>
      ) : (
        <p className={`text-sm text-left text-gray-400 mt-2 sm:text-sm`}>
          Already have an account?{" "}
          <Link
           className={`${props.userType==="Student" ? 'text-studentAccent/75 hover:text-studentAccent' : 'text-mentorAccent/75 hover:text-mentorAccent'} text-left font-semibold mt-2 sm:text-sm`}
            to={`${
              props.userType === "Mentor" ? "/mentorsignin" : "/studentsignin"
            }`}
          >
            Login
          </Link>
        </p>
      )}
      <p className="text-sm text-left text-gray-400 mt-2 sm:text-sm">
        Signup as {props.userType === "Mentor" ? <Link  className="text-mentorAccent/75 font-semibold hover:text-mentorAccent" to="/studentsignup">student</Link> : <Link className="text-studentAccent/75 font-semibold hover:text-studentAccent" to="/mentorsignup">Mentor</Link>} 
      </p>
    </div>
  );
};
