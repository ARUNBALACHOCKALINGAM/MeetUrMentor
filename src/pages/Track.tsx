import { useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import { useSelector } from "react-redux";

import { FaReact, FaAndroid} from "react-icons/fa";
import { VscTools } from "react-icons/vsc";
import { IoGameController } from "react-icons/io5";
import { SiFlutter } from "react-icons/si";
import { AiOutlineCloudServer } from "react-icons/ai"; // For Backend example
import { IoIosStats } from "react-icons/io"; // For AI and Data Scientist
import { SiHiveBlockchain } from "react-icons/si"; // For Blockchain
import { FaPen } from "react-icons/fa"; // For Technical Writer
import { UserState } from "../abstraction/types/userData.types";

const Track = () => {
  
  const roles = [
    {
      role: "Frontend",
      roleIcon: <FaReact size={20}/>,
    },
    {
      role: "Backend",
      roleIcon: <AiOutlineCloudServer />,
    },
    {
      role: "DevOps",
      roleIcon: <VscTools />,
    },
    {
      role: "Fullstack",
      roleIcon: <FaReact />,
    },
    {
      role: "Android",
      roleIcon: <FaAndroid />,
    },
    {
      role: "AI and Data Scientist",
      roleIcon: <IoIosStats />,
    },
    {
      role: "Blockchain",
      roleIcon: <SiHiveBlockchain />,
    },
    {
      role: "Game Developer",
      roleIcon: <IoGameController />,
    },
    {
      role: "Technical Writer",
      roleIcon: <FaPen />,
    },
    {
      role: "React",
      roleIcon: <FaReact />,
    },
    {
      role: "React Native",
      roleIcon: <FaReact />,
    },
    {
      role: "Flutter",
      roleIcon: <SiFlutter />,
    },
  ];

  const navigate = useNavigate();
  const userType = useSelector((state: UserState) => state.user.userType);

  // Use original color palette
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
    <div className={`w-screen min-h-screen ${colors.bg} flex flex-col items-center`}>
      <Header userType={userType} />
      <div className="w-full px-6 py-8">
        <div className="w-full flex items-center mb-6">
          <hr className={`flex-grow ${colors.border}`} />
          <div
            className={`font-regular px-4 py-1 rounded-md bg-white border ${colors.border} shadow`}
          >
            <h3 className={`text-lg font-medium ${colors.text}`}>Role-Based Tracks</h3>
          </div>
          <hr className={`flex-grow ${colors.border}`} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mx-auto w-full p-8 text-md md:w-3/4">
          {roles.map((role) => (
            <button
              key={role.role}
              onClick={() =>
                navigate("/home")
              }
              className={`transition-all duration-200 border ${colors.border} bg-white rounded-md p-3 sm:p-4 text-left text-sm font-semibold ${colors.text} ${colors.shadow} ${colors.hoverBg} hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:outline-none`}
            >
              <div className="flex items-center">
                <span className={`material-icons text-base mr-2 ${userType==="mentor" ? "text-[#1D4ED8]" : "text-[#FF8C00]"}`}>
                  {role.roleIcon}
                </span>
                <span>{role.role}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Track;
