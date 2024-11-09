import { Link } from "react-router-dom";
import useRoleChange from "../../utils/hooks/useRoleChange";

export const NotRegisteredYet = ({userType}:any) => {
  
  const handleRoleChange = useRoleChange();

  return (
    <div className="flex justify-end p-2 mt-4">
      <p className="text-sm">Not registered yet?</p>
      &nbsp;
      <Link onClick={()=>{userType==="mentor" ? handleRoleChange("mentor") : handleRoleChange("student")}} to="/signup" className={`text-sm font-semibold ${userType==="mentor" ? "text-mentorAccent/75 hover:text-mentorAccent" : "text-studentAccent/75 hover:text-studentAccent"} `}>Create an account</Link>
    </div>
  );
};
