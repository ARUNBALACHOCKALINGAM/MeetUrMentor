import { FaGithubAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { Input } from "../../../../components/form/Input";
import { Button } from "../../../../components/ui/Button";
import { Welcome } from "../../../../components/ui/Welcome";
import { RememberSection } from "../../../../components/form/RememberSection";
import { NotRegisteredYet } from "../../../../components/form/NotRegisteredYet";

export const SignInForm = () => {
  return (
    <div className="mt-24 xl:w-9/12 xl:mt-28 lg:mt-16 md:w-9/12 w-11/12 mx-auto md:mt-0">
      <Welcome userType="Mentor" type="Login" />
      <div className="flex justify-between w-full">
        <Button
          Icon={<FcGoogle className="w-8 sm:w-5" />}
          buttonText="Sign in with google"
          additionalStyling="border-2 custom-width-45 mr-2"
        />
        <Button
          Icon={<FaGithubAlt className="w-8 sm:w-5" />}
          buttonText="Sign in with Github"
          additionalStyling="border-2 bg-black custom-width-45 text-white ml-2"
        />
      </div>
      <div className="flex items-center mt-8">
        <div className="border-b border-gray-300 flex-grow mr-4"></div>
        <div className="text-gray-500">or</div>
        <div className="border-b border-gray-300 flex-grow ml-4"></div>
      </div>
      <Input
        labelText="Email"
        placeholder="Email"
        Icon={<AiOutlineMail />}
        error=""
        type="email"
      />
      <Input
        labelText="Password"
        placeholder="Password"
        Icon={<AiOutlineLock />}
        error=""
        type="password"
      />
      <RememberSection />
      <Button
        buttonText="Login"
        additionalStyling="bg-orangejuice text-white shadow-orange-500 lg:p-4"
      />
      <NotRegisteredYet />
    </div>
  );
};
