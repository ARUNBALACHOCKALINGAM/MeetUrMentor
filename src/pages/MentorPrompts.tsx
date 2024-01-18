import { PromptsForm } from "../features/details/PromptsForm";
//import Header from "../layouts/Header";
import {Banner} from "../layouts/Banner";

const MentorPrompts = () => {
  return (
    <div className="w-screen h-screen mx-auto text-center bg-bluebg ">
      <Banner title="Become a mentor"/>
      <PromptsForm type='mentor'/>
    </div>
  );
};

export default MentorPrompts;
