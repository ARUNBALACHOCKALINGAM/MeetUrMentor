import { DetailsForm } from "../features/authentication/details/DetailsForm";
//import Header from "../layouts/Header";
import {Banner} from "../layouts/Banner";

const StudentDetails = () => {
  return (
    <div className="w-screen mx-auto text-center bg-bluebg ">
      <Banner title="Sign up as a student"/>
      <DetailsForm type='student'/>
    </div>
  );
};

export default StudentDetails;
