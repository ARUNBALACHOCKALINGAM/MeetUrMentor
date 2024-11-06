// section below the form inputs

import { Link } from "react-router-dom";

export const RememberSection = ({userType}:any) => {
  console.log(userType)
    return (
      <div className="flex items-center justify-between text-sm mt-4 p-2">
        <div className="flex items-center">
          <input type="checkbox" id="remember" className="mr-2 default:ring-2 indeterminate:bg-gray-300 " />
          <label htmlFor="remember">Remember me</label>
        </div>
        <Link to={userType=="Mentor" ? '/forgotpassword' : '/forgotpassword'} className={`text-sm font-semibold ${userType==="Mentor" ? "text-mentorAccent/75 hover:text-mentorAccent" : "text-studentAccent/75 hover:text-studentAccent"} `}>Forgot password?</Link>
      </div>
    );
  };
  