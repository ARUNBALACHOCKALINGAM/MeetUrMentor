import { useEffect, useState } from "react";
import {
  FaGithub,
  FaGlobe,
  FaTimes,
  FaLinkedin,
  FaHeart,
} from "react-icons/fa";
import { SiCodechef, SiLeetcode } from "react-icons/si";
import { AuthFormProps } from "../../abstraction/types/authentication.types";
import axiosInstance from "../../utils/axiosInstance";
import { UserProfile } from "../../abstraction/types/userData.types";

export const PersonalCard = ({ userType }: AuthFormProps) => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [profiles, setProfiles] = useState<UserProfile[]>([]);

  const fetchUsersByUserType = async () => {
    try {
      const response = await axiosInstance.get(`/user?userType=${userType==="mentor" ? "student" : "mentor"}`);
      setProfiles(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsersByUserType();
  }, []);

  const socialMediaLogos: { [key: string]: JSX.Element } = {
    LinkedIn: <FaLinkedin />,
    Github: <FaGithub />,
    Leetcode: <SiLeetcode />,
    CodeChef: <SiCodechef />,
    Portfolio: <FaGlobe />,
  };

  const colors =
    userType === "mentor"
      ? {
          bg: "bg-white",
          border: "border-[#FFC400]",
          text: "text-[#FF8C00]",
          hoverBg: "hover:bg-[#FFF5E6]",
          shadow: "hover:shadow-sm shadow-[#FFC400]",
        }
      : {
          bg: "bg-white",
          border: "border-[#1D4ED8]",
          text: "text-[#1D4ED8]",
          hoverBg: "hover:bg-[#1D4ED8]",
          shadow: "shadow-xs hover:shadow-[#1D4ED8]",
        };

  const handleAction = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsFading(false);
      setCurrentProfileIndex((prevIndex) => (prevIndex + 1) % profiles.length);
    }, 500);
  };

  if (profiles.length === 0) {
    return <div className="text-center mt-10">No profiles available</div>;
  }

  const currentProfile = profiles[currentProfileIndex];

  return (
    <div
      className={`mt-[2%] mx-auto rounded-2xl shadow-md border-gray-300 border relative transition-opacity duration-500 lg:w-9/12 h-[90%] ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col lg:flex-row h-full">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 h-full">
          <img
            className="w-full h-full object-cover"
            src={`src/assets/aiavatars/${currentProfile.avatar}`}
            alt="Profile Background"
          />
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2 p-6 mb-[20%] lg:mt-[12%] relative overflow-auto h-full">
          <div className="text-center lg:text-left mt-4 lg:mt-0">
            <h1 className={`text-xl lg:text-3xl font-bold ${colors.text}`}>
              {currentProfile.username}
            </h1>
            <h2 className="text-sm text-gray-700 mt-1">
              Track: {currentProfile.track}
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              {currentProfile.role} at {currentProfile.company}
            </p>
          </div>

          {/* Social Media Tags */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-6">
            {currentProfile.socialMedia.map((socialMediaField) => (
              socialMediaField.url!=="#" && 
              <a
                key={socialMediaField.name}
                href={socialMediaField.url}
                className={`flex items-center gap-2 rounded-full px-4 py-1.5 border text-gray-600 text-sm transition-all ${colors.border} ${colors.bg} hover:${colors.hoverBg} hover:text-gray-800`}
              >
                {socialMediaLogos[socialMediaField.name] || <FaGlobe />}
                <span className="font-medium">{socialMediaField.name}</span>
              </a>
            ))}
          </div>

          <div>
            <p className="text-md text-gray-700 mt-10 text-left">
              {currentProfile.about}
            </p>
          </div>
        </div>

        {/* Tick and Cross Actions */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex justify-center gap-10 items-center">
          <button
            className={`bg-white border border-2 text-gray-700 rounded-full w-16 h-16 flex shadow-md items-center justify-center transition-all ${colors.shadow}`}
            onClick={handleAction}
          >
            <FaTimes size={28} />
          </button>
          <button
            className={`bg-white ${
              userType === "mentor"
                ? "text-yellow-500 shadow-yellow-500"
                : "text-blue-500 shadow-blue-500"
            } border border-2 shadow-md rounded-full w-16 h-16 flex items-center justify-center transition-all ${colors.shadow}`}
            onClick={handleAction}
          >
            <FaHeart size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};
