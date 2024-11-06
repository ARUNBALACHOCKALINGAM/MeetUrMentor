import { Link } from "react-router-dom";
export const NotRegisteredYet = ({userType}:any) => {



  return (
    <div className="flex justify-end p-2 mt-4">
      <p className="text-sm">Not registered yet?</p>
      &nbsp;
      <Link to={userType==="Mentor"  ? '/mentorsignup' : "/studentsignup"} className={`text-sm font-semibold ${userType==="Mentor" ? "text-mentorAccent/75 hover:text-mentorAccent" : "text-studentAccent/75 hover:text-studentAccent"} `}>Create an account</Link>
    </div>
  );
};
