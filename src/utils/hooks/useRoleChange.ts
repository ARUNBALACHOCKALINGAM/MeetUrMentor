import { useDispatch } from "react-redux";
import { setUserType } from "../../data/store/user";

const useRoleChange = () => {
  const dispatch = useDispatch();

  const handleRoleChange = (newUserType: "mentor" | "student") => {
    console.log(newUserType);
    dispatch(setUserType(newUserType));
  };

  return handleRoleChange;
};

export default useRoleChange;
