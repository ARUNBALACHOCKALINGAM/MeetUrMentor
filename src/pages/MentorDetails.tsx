import { DetailsForm } from "../features/authentication/components/DetailsForm";
import Banner from "../layouts/Banner";

const MentorDetails = () => {
  const formData = {
    title: "Become a mentor",
    desc: "Fill in your details",
  };

  return (
    <div className="w-screen mx-auto text-center">
      <Banner formHeading={formData}/>
      <DetailsForm type='mentor'/>
    </div>
  );
};

export default MentorDetails;
