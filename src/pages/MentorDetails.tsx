import { DetailsForm } from "../features/authentication/components/DetailsForm";
import Banner from "../layouts/Banner";

const MentorDetails = () => {

  return (
    <div className="w-screen mx-auto text-center">
      <Banner title="Become a mentor"/>
      <DetailsForm type='mentor'/>
    </div>
  );
};

export default MentorDetails;
