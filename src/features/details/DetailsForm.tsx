import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAvatar, setUserDetails } from "../../data/store/user";
import { Banner } from "../../layouts/Banner";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/form/Input";
import { Textarea } from "../../components/form/TextArea";
import { FaLinkedin, FaGithub, FaCode, FaDev, FaGlobe, FaUserTie, FaBriefcase, FaUniversity, FaGraduationCap, FaClipboardList } from 'react-icons/fa';
import { FormData } from "../../abstraction/types/userData.types";


type DetailsFormProps = {
  userType?: 'student' | 'mentor'; // Assuming userType is a string, adjust accordingly
};

export const DetailsForm: React.FC<DetailsFormProps> = ({ userType }) => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    about: "",
    company: "",
    role: "",
    highestQualification: "",
    university: "",
    cgpa: "",
    linkedin: "",
    github: "",
    leetcode: "",
    codechef: "",
    portfolio: "",
    avatar: ""
  });

  // Fix: Explicitly type `field` as keyof FormData
  const handleInputChange = (value: string, field?: string) => {
    if (field) {
      setFormData((prev) => ({
        ...prev,
        [field]: value, // TypeScript will know `field` is a valid key of FormData
      }));
    }
  };

  const [errors, setErrors] = useState<Record<string, string>>({});
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.highestQualification) newErrors.highestQualification = "Qualification is required";
    if (!formData.university) newErrors.university = "University is required";
    if (!formData.cgpa) newErrors.cgpa = "CGPA is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const socialMediaFields = [
    { name: "linkedin", logo: <FaLinkedin />, placeholder: "LinkedIn Profile URL" },
    { name: "github", logo: <FaGithub />, placeholder: "GitHub Profile URL" },
    { name: "leetcode", logo: <FaCode />, placeholder: "Leetcode Profile URL" },
    { name: "codechef", logo: <FaDev />, placeholder: "CodeChef Profile URL" },
    { name: "portfolio", logo: <FaGlobe />, placeholder: "Portfolio URL" },
  ];

  const mentorFields = [
    { name: "company", logo: <FaBriefcase />, placeholder: "Company Name" },
    { name: "role", logo: <FaUserTie />, placeholder: "Mentor's Role" },
  ];

  const studentFields = [
    { name: "university", logo: <FaUniversity />, placeholder: "University Name" },
    { name: "highestQualification", logo: <FaGraduationCap />, placeholder: "Highest Qualification" },
    { name: "cgpa", logo: <FaClipboardList />, placeholder: "CGPA" },
  ];

  const handleAvatarSelect = (avatar: string) => {
    setFormData((prev) => ({ ...prev, avatar }));
  };


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(setUserDetails({ formData }));
    navigate("/track");
  };

  return (
    <form
      className={`lg:py-20 ${userType === "mentor" ? "bg-[#FFF5E6]" : "bg-[#F0F5FF]"
        }`}
    >
      <div className="mx-auto bg-white py-20 space-y-12 text-left p-2 px-10 sm:w-full md:w-8/12 lg:w-9/12 xl:1/2 lg:rounded-lg">
        <Banner userType={userType} />
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6">
          {/* Username Input */}
          <div className="sm:col-span-4">
            <Input
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              field="username"
              onBlur={validateForm}
              placeholder="Enter your username"
              errorMessage={errors.username}
              labelText="Username"
              additionalStyling="border-gray-300 focus:border-blue-500"
              labelStyles={`font-semibold ${userType === "mentor" ? "text-[#FF7324]" : "text-[#4267B2]"
                }`}
            />
          </div>
          {/* Avatar Selection */}
          <div className="sm:col-span-4 mt-4">
            <h2 className={`text-sm md:text-lg font-semibold ${userType === "mentor" ? "text-[#FF7324]" : "text-[#4267B2]"}`}>
              Select Your Avatar
            </h2>
            <div className="mt-6 flex space-x-4">
              {[{ src: "src/assets/aiavatars/jack.png", name: "jack.png" }, { src: "src/assets/aiavatars/ryan.png", name: "ryan.png" }].map((avatar) => (
                <div
                  key={avatar.name}
                  className={`p-2 border rounded-full cursor-pointer ${formData.avatar === avatar.name ? userType === "student" ? "border-blue-500 shadow-blue-500 shadow-lg" : "border-red-500 shadow-red-500 shadow-lg" : "border-gray-300"
                    }`}
                  onClick={() => handleAvatarSelect(avatar.name)}
                >
                  <img src={avatar.src} alt={avatar.name} className="w-20 h-20 object-cover rounded-full" />
                </div>
              ))}
            </div>
          </div>

          {/* About Textarea */}
          <div className="col-span-full mt-4">
            <Textarea
              placeholder="Write a few sentences about yourself"
              value={formData.about}
              onChange={handleInputChange}
              field="about"
              onBlur={validateForm}
              labelText="About"
              errorMessage={errors.about}
              labelStyles={`font-semibold ${userType === "mentor" ? "text-[#FF7324]" : "text-[#4267B2]"
                }`}
              type="text"
            />
          </div>
        </div>



        {/* Education or Work */}
        <div>
          <h2
            className={`text-lg lg:text-2xl font-semibold ${userType === "mentor" ? "text-[#FF7324]" : "text-[#4267B2]"
              }`}
          >
            Education {userType === "student" ? "" : "and Work"}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {(userType === "mentor" ? mentorFields : studentFields).map(
              (field) => (
                <div key={field.name} className="sm:col-span-2">
                  <Input
                    type="text"
                    value={formData[field.name as keyof FormData]}
                    onChange={handleInputChange}
                    field={field.name.toLowerCase()}
                    placeholder={field.placeholder}
                    labelText={field.name}
                    labelStyles={`font-semibold ${userType === "mentor"
                        ? "text-[#FF7324]"
                        : "text-[#4267B2]"
                      }`}
                    onBlur={validateForm}
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h2
            className={`text-lg lg:text-2xl font-semibold ${userType === "mentor" ? "text-[#FF7324]" : "text-[#4267B2]"
              }`}
          >
            Socials
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {socialMediaFields.map((field, index) => (
              <div
                key={field.name}
                className={`sm:col-span-${index === 0 ? "3" : "2"}`}
              >
                <Input
                  type="text"
                  value={formData[field.name as keyof FormData]}
                  onChange={handleInputChange}
                  field={field.name.toLowerCase()}
                  placeholder={field.placeholder}
                  labelText={field.name}
                  labelStyles={`font-semibold ${userType === "mentor" ? "text-[#FF7324]" : "text-[#4267B2]"
                    }`}
                  Icon={field.logo}
                  onBlur={validateForm}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <Button
            onClick={() => navigate(-1)}
            buttonText="Cancel"
            additionalStyling="bg-gray-200 text-gray-600"
          />
          <Button
            onClick={() => {
              dispatch(setUserDetails({ ...formData }));
              dispatch(setAvatar(formData.avatar));
              navigate("/track");
            }}
            buttonText="Save"
            additionalStyling={`${
              userType === "mentor" ? "bg-[#FF7324] hover:bg-[#FF6B00]" : "bg-[#4267B2] hover:bg-[#365899]"
            } text-white`}
          />
        </div>
      </div>
    </form>
  );
};
