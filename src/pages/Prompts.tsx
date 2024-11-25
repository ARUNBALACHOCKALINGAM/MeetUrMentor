import { useSelector } from "react-redux";
import { PromptsForm } from "../features/details/PromptsForm";
//import Header from "../layouts/Header";
import {Banner} from "../layouts/Banner";

const Prompts = () => {

const userType = useSelector((state: any) => state.user.userType);


  return (
    <div className="w-screen mx-auto text-center bg-bluebg">
      <Banner userType={userType}/>
      <PromptsForm type={userType}/>
    </div>
  );
};

export default Prompts;
