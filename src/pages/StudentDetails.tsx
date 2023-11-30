import { DetailsForm } from "../features/authentication/components/DetailsForm";
import Banner from "../layouts/Banner";

const MentorDetails = () => {
  

  return (
    <div className="w-screen mx-auto text-center">
      <Banner title="Sign up as a student"/>
      <DetailsForm type='student'/>
    </div>
  );
};

export default MentorDetails;
