import { DetailsForm } from "../features/authentication/components/DetailsForm";
import Banner from "../layouts/Banner";

const MentorDetails = () => {
  const formData = {
    title: "Sign up as a student"
  };

  return (
    <div className="w-screen mx-auto text-center">
      <Banner formHeading={formData}/>
      <DetailsForm type='student'/>
    </div>
  );
};

export default MentorDetails;
