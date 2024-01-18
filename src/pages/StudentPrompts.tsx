import { PromptsForm } from "../features/details/PromptsForm";
//import Header from "../layouts/Header";
import {Banner} from "../layouts/Banner";

const StudentPrompts = () => {
  return (
    <div className="w-screen h-screen mx-auto text-center bg-bluebg ">
      <Banner title="Sign up as a student"/>
      <PromptsForm type='student'/>
    </div>
  );
};

export default StudentPrompts;
