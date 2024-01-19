
import { DetailsForm } from "../features/details/DetailsForm";
import {Banner} from "../layouts/Banner";

const MentorDetails = () => {

  return (
    <div className="w-screen mx-auto text-center bg-bluebg">
      <Banner title="Become a mentor"/>
      <DetailsForm type='mentor'/>
    </div>
  );
};

export default MentorDetails;
