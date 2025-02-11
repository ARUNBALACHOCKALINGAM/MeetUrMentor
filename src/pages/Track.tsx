import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../layouts/Header";
import classNames from "classnames"; // Install this package for better class handling

import { FaReact, FaAndroid } from "react-icons/fa";
import { VscTools } from "react-icons/vsc";
import { IoGameController } from "react-icons/io5";
import { SiFlutter, SiHiveBlockchain } from "react-icons/si";
import { AiOutlineCloudServer } from "react-icons/ai";
import { IoIosStats } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import { UserState } from "../abstraction/types/userData.types";
import { setUserTrack } from "../data/store/user";
import axiosAuth from "../utils/axiosInstance";

// Define roles outside the component to avoid re-creation
const roles = [
  { role: "Frontend", roleIcon: <FaReact size={20} /> },
  { role: "Backend", roleIcon: <AiOutlineCloudServer size={20} /> },
  { role: "DevOps", roleIcon: <VscTools size={20} /> },
  { role: "Fullstack", roleIcon: <FaReact size={20} /> },
  { role: "Android", roleIcon: <FaAndroid size={20} /> },
  { role: "AI and Data Scientist", roleIcon: <IoIosStats size={20} /> },
  { role: "Blockchain", roleIcon: <SiHiveBlockchain size={20} /> },
  { role: "Game Developer", roleIcon: <IoGameController size={20} /> },
  { role: "Technical Writer", roleIcon: <FaPen size={20} /> },
  { role: "React", roleIcon: <FaReact size={20} /> },
  { role: "React Native", roleIcon: <FaReact size={20} /> },
  { role: "Flutter", roleIcon: <SiFlutter size={20} /> },
];

const Track = () => {
  const navigate = useNavigate();
  const user = useSelector((state: UserState) => state.user);
  const userType = user?.userType;
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");

  const handleRoleSelection = async (role: String) => {
    dispatch(setUserTrack({ track: role }));
    try {
      const userDetails = await axiosAuth.get(`/user/details?email=${email}`);
      const result = await axiosAuth.post("/user/details",{...userDetails.data,track:role});
      if(result.status == 200){
        navigate('/home')
        console.log(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Theme colors based on userType
  const colors =
    userType === "mentor"
      ? {
        bg: "bg-gray-100",
        border: "border-[#FFC400]",
        text: "text-[#FF8C00]",
        hoverBg: "hover:bg-[#FFF5E6]",
        shadow: "hover:shadow-lg shadow-[#FFC400]",
      }
      : {
        bg: "bg-gray-50",
        border: "border-[#1D4ED8]",
        text: "text-[#1D4ED8]",
        hoverBg: "hover:bg-[#E0F2FE]",
        shadow: "hover:shadow-lg shadow-[#1D4ED8]",
      };

  return (
    <div className={classNames("w-screen min-h-screen flex flex-col items-center", colors.bg)}>
      <Header userType={userType} />
      <div className="w-full px-6 py-8">
        {/* Section Header */}
        <div className="w-full flex items-center mb-6">
          <hr className={classNames("flex-grow", colors.border)} />
          <div className={classNames("font-regular px-4 py-1 rounded-md bg-white border shadow", colors.border)}>
            <h3 className={classNames("text-lg font-medium", colors.text)}>Role-Based Tracks</h3>
          </div>
          <hr className={classNames("flex-grow", colors.border)} />
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mx-auto w-full p-8 text-md md:w-3/4">
          {roles.map(({ role, roleIcon }) => (
            <button
              key={role}
              id={role}
              onClick={() => handleRoleSelection(role)}
              className={classNames(
                "transition-all duration-200 border bg-white rounded-md p-3 sm:p-4 text-left text-sm font-semibold hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:outline-none",
                colors.border,
                colors.text,
                colors.shadow,
                colors.hoverBg
              )}
            >
              <div className="flex items-center">
                <span className={classNames("mr-2", userType === "mentor" ? "text-[#1D4ED8]" : "text-[#FF8C00]")}>
                  {roleIcon}
                </span>
                <span>{role}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Track;
