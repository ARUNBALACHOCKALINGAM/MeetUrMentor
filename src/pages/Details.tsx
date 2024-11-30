

import { useSelector } from "react-redux";
import { DetailsForm } from "../features/details/DetailsForm";
import { UserState } from "../abstraction/types/userData.types";


const Details = () => {
  const userType = useSelector((state: UserState) => state.user.userType);
  
  return (
    <div className={`w-screen mx-auto text-center ${userType==="mentor" ? "bg-mentorPrimary/75" : "bg-studentAccent/75"}`}>
      <DetailsForm userType={userType}/>
    </div>
  );
};

export default Details;
