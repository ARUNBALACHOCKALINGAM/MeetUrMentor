

import { useSelector } from "react-redux";
import { DetailsForm } from "../features/details/DetailsForm";
import {Banner} from "../layouts/Banner";

const Details = () => {
  const userType = useSelector((state: any) => state.user.userType);
  
  return (
    <div className={`w-screen mx-auto text-center ${userType==="mentor" ? "bg-mentorSecondary/75" : "bg-studentPrimary"}`}>
      <Banner title="Become a mentor"/>
      <DetailsForm userType={userType}/>
    </div>
  );
};

export default Details;
