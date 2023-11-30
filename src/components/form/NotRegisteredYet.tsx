import { Link } from "react-router-dom";
export const NotRegisteredYet = () => {



  return (
    <div className="flex justify-end p-2 mt-4">
      <p className="text-sm">Not registered yet?</p>
      &nbsp;
      <Link to='/mentorsignup' className="text-sm">Create an account</Link>
    </div>
  );
};
