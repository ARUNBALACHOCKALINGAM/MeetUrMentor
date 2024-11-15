// import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserDetails } from "../../data/store/user";
import { Banner } from "../../layouts/Banner";
import { Button } from "../../components/ui/Button";

import { UserCircleIcon } from "@heroicons/react/20/solid";
import { Input } from "../../components/form/Input";
import { Textarea } from "../../components/form/TextArea";
import { FaLinkedin, FaGithub, FaCode, FaDev, FaGlobe, FaUserTie, FaBriefcase, FaUniversity, FaGraduationCap, FaClipboardList } from 'react-icons/fa';



type DetailsFormProps = {
  userType?: 'student' | 'mentor'; // Assuming userType is a string, adjust accordingly
};

export const DetailsForm: React.FC<DetailsFormProps> = ({ userType }) => {

  // states for each input
  const [formData, setFormData] = useState({
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
    portfolio: ""
  });


  const handleInputChange = (value: string, field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value, // Replace the field's value with the new input value
    }));
  };


  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    newErrors.about = "";
    // Validate required fields
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.highestQualification) newErrors.highestQualification = "Qualification is required";
    if (!formData.university) newErrors.university = "University is required";
    if (!formData.cgpa) newErrors.cgpa = "CGPA is required";

    // Validate social media URLs
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)([\/\w\.-]*)*\/?$/; // Basic URL regex

    if (formData.linkedin && !urlPattern.test(formData.linkedin)) newErrors.linkedin = "Invalid LinkedIn URL";
    if (formData.github && !urlPattern.test(formData.github)) newErrors.github = "Invalid GitHub URL";
    if (formData.leetcode && !urlPattern.test(formData.leetcode)) newErrors.leetcode = "Invalid LeetCode URL";
    if (formData.codechef && !urlPattern.test(formData.codechef)) newErrors.codechef = "Invalid CodeChef URL";
    if (formData.portfolio && !urlPattern.test(formData.portfolio)) newErrors.portfolio = "Invalid Portfolio URL";

    // Validate mentor fields
    if (!formData.company) newErrors.company = "Company is required";
    if (!formData.role) newErrors.role = "Role is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const socialMediaFields = [
    {
      name: "linkedin",
      logo: <FaLinkedin />,
      placeholder: "LinkedIn Profile URL",
    },
    {
      name: "github",
      logo: <FaGithub />,
      placeholder: "GitHub Profile URL",
    },
    {
      name: "leetcode",
      logo: <FaCode />,
      placeholder: "Leetcode Profile URL",
    },
    {
      name: "codechef",
      logo: <FaDev />,
      placeholder: "CodeChef Profile URL",
    },
    {
      name: "portfolio",
      logo: <FaGlobe />,
      placeholder: "Portfolio URL",
    },
  ];

  const mentorFields = [
    {
      name: "company",
      logo: <FaBriefcase />,
      placeholder: "Company Name",
    },
    {
      name: "role",
      logo: <FaUserTie />,
      placeholder: "Mentor's Role",
    },
  ];

  const studentFields = [
    {
      name: "university",
      logo: <FaUniversity />,
      placeholder: "University Name",
    },
    {
      name: "highest qualification",
      logo: <FaGraduationCap />,
      placeholder: "Highest Qualification",
    },
    {
      name: "cgpa",
      logo: <FaClipboardList />,
      placeholder: "CGPA",
    },
  ];



  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleStudentSave = () => {
    dispatch(setUserDetails({
      formData
    }))
    navigate('/studenttrack');

  }

  const handleMentorSave = () => {
    dispatch(setUserDetails({
      formData
    }))
    navigate('/mentortrack');
  }


  return (
    <form className={` lg:py-20 ${userType === "mentor" ? "bg-mentorPrimary/75" : "bg-studentAccent/75"}`}>

      <div className="mx-auto bg-white py-20 space-y-12 text-left p-2 px-10 sm:w-full md:w-8/12 lg:w-9/12 xl:1/2 lg:rounded-lg">
        <Banner userType={userType} title={`Become a ${userType==="student" ? "Study Buddy!" : "Knowledge Guru!"}`} />
        <div className="">
          <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <div className="mt-2">
                <div className="flex rounded-md bg-white sm:max-w-md">
                  <Input
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                    field="username"
                    onBlur={validateForm}
                    placeholder="Enter your username"
                    errorMessage={errors.username}
                    additionalStyling={`border-black ${userType==="mentor" ? "text-mentorAccent/75" : "text-studentPrimary"}`} 
                    containerStyles={`border-1 ${userType==="mentor" ? "text-mentorAccent" : "text-studentPrimary"} `}
                    labelStyles={`font-semibold ${userType==="mentor" ? "text-mentorAccent" : "text-studentPrimary"}`}
                    labelText="Username"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <div className="mt-2 bg-white">
                <Textarea
                  placeholder={"Write a few sentences about yourself"}
                  value={formData.about}
                  onChange={handleInputChange}
                  field="about"
                  onBlur={validateForm}
                  labelText="About"
                  errorMessage={errors.about}
                  additionalStyling={`border-black ${userType==="mentor" ? "text-mentorAccent" : "text-studentPrimary"}`} 
                  labelStyles={`font-semibold ${userType==="mentor" ? "text-mentorAccent" : "text-studentPrimary"}`}
                  containerStyles={`border-1 ${userType==="mentor" ? "text-mentorAccent" : "text-studentPrimary"} shadow-sm`}
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className={`text-base lg:text-2xl  font-semibold leading-7 ${userType==="mentor" ? "text-mentorAccent" : "text-studentPrimary"}`}>
            Education {userType === "student" ? "" : "and Work"}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {userType === "mentor" && (
              mentorFields.map((field, index) => (
                <div key={field.name} className="sm:col-span-3">
                  <div className="mt-2 bg-white">
                    <Input
                      type="text"
                      value={formData[field.name]} // Dynamically access the value for this field
                      onChange={handleInputChange}
                      onBlur={validateForm}
                      labelText={field.name.charAt(0).toUpperCase() + field.name.slice(1)} // Convert field name to uppercase for label
                      field={field.name.toLowerCase()} // Pass the current field name
                      placeholder={field.placeholder} // Use the appropriate placeholder
                      errorMessage={errors[field.name]} // Dynamically access the error for this field
                      additionalStyling={`border-studentPrimary ${userType==="mentor" ? "text-mentorAccent/75" : "text-studentPrimary"}`} 
                      labelStyles={`${userType==="mentor" ? "text-mentorAccent/75" : "text-studentPrimary/75"}`}
                      containerStyles={`border-1 ${userType==="mentor" ? "text-mentorAccent" : "text-studentPrimary"} shadow-sm`}
                    />
                  </div>
                </div>
              ))
            )}
            {
              studentFields.map((field, index) => (
                <div key={field.name} className="sm:col-span-2">
                  <div className="mt-2 bg-white">
                    <Input
                      type="text"
                      value={formData[field.name]} // Dynamically access the value for this field
                      onChange={handleInputChange}
                      onBlur={validateForm}
                      labelText={field.name.charAt(0).toUpperCase() + field.name.slice(1)}// Convert field name to uppercase for label
                      field={field.name.trim().toLowerCase()} // Pass the current field name
                      placeholder={field.placeholder} // Use the appropriate placeholder
                      errorMessage={errors[field.name.trim().toLowerCase()]} // Dynamically access the error for this field
                      additionalStyling={`border-black ${userType==="mentor" ? "text-mentorAccent/75" : "text-studentPrimary"}`} 
                      labelStyles={`${userType==="mentor" ? "text-mentorAccent/75" : "text-studentPrimary/75"}`}
                      containerStyles={`border-1 ${userType==="mentor" ? "text-mentorAccent" : "text-studentPrimary"} shadow-sm`}
                    />
                  </div>
                </div>
              ))}

          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className={`text-base lg:text-2xl  font-semibold leading-7 ${userType==="mentor" ? "text-mentorAccent" : "text-studentPrimary"}`}>
            Socials
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {socialMediaFields.map((field, index) => (
              <div
                key={field.name}
                className={`${index === 0 || index === 1
                  ? "sm:col-span-3"
                  : index === 2
                    ? "sm:col-span-2 sm:col-start-1"
                    : "sm:col-span-2"
                  }`}
              >
                <div className="mt-2 bg-white">
                  <Input
                    type="text"
                    value={formData[field.name]} // Dynamically access the value for this field
                    onChange={handleInputChange}
                    onBlur={validateForm}
                    labelText={field.name.charAt(0).toUpperCase() + field.name.slice(1)} // Convert field name to uppercase for label
                    field={field.name.toLowerCase()} // Pass the current field name
                    placeholder={field.placeholder} // Use the appropriate placeholder
                    errorMessage={errors[field.name]} // Dynamically access the error for this field
                    additionalStyling={`border-black ${userType==="mentor" ? "text-mentorAccent/75" : "text-studentPrimary"}`} 
                    containerStyles={`border-1 ${userType==="mentor" ? "text-mentorAccent" : "text-studentPrimary"} shadow-sm`}
                    labelStyles={`${userType==="mentor" ? "text-mentorAccent/75" : "text-studentPrimary/75"}`}
                    Icon={field.logo} // Use the field's logo
                  />
                </div>
              </div>
            ))}






          </div>
        </div>
        <div className="w-full flex justify-end">
          <div className="w-full lg:w-1/2 flex mt-4">
            <Button

              onClick={() => { console.log("Save") }}
              buttonText="Cancel"
              additionalStyling="mr-2 text-2xl"
            />
            <Button

              onClick={() => { console.log("Save") }}
              buttonText={"Save"}
              additionalStyling={`${userType === "mentor" ? "bg-mentorPrimary shadow-mentorPrimary/50" : "bg-studentAccent shadow-studentAccent/50"}  text-white font-semibold w-9/12 ml-2 shadow-md`}
            />
          </div>
        </div>

      </div>

    </form>
  );
};
