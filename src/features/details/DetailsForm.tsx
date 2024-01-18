// import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStudentDetails } from "../../data/store/student";
import { setMentorDetails } from "../../data/store/mentor";



type DetailsFormProps = {
  type: 'student' | 'mentor'; // Assuming type is a string, adjust accordingly
};

export const DetailsForm:  React.FC<DetailsFormProps> = ({ type }) => {

  // states for each input
  const [username, setUsername] = useState('');
  const [about, setAbout] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [highestQualification, setHighestQualification] = useState('');
  const [university, setUniversity] = useState('');
  const [cgpa, setCGPA] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [github, setGithub] = useState('');
  const [leetcode, setLeetcode] = useState('');
  const [codechef, setCodechef] = useState('');
  const [portfolio, setPortfolio] = useState('');


  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleStudentSave = () => {
    dispatch(setStudentDetails({
      username: username,
      about: about,
      highestQualification: highestQualification,
      university: university,
      cgpa: cgpa,
      linkedIn: linkedIn,
      github: github,
      leetcode: leetcode,
      codechef: codechef,
      portfolio: portfolio
    }))
    navigate('/studenttrack');
    
  }

  const handleMentorSave = () => {
    dispatch(setMentorDetails({
      username: username,
      about: about,
      highestQualification: highestQualification,
      university: university,
      cgpa: cgpa,
      linkedIn: linkedIn,
      github: github,
      leetcode: leetcode,
      codechef: codechef,
      portfolio: portfolio,
      company: company,
      role:role
    }))
    navigate('/mentortrack');
  }


  return (
    <form>
      <div className="w-full mx-auto space-y-12 text-left p-2 shadow-sm sm:w-full md:w-8/12 lg:w-1/2">
        <div className="border-b border-gray-900/10 pb-12 mt-4">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-white"
              >
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md bg-bluefill shadow-sm ring-1 ring-inset ring-gray-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-400 sm:text-sm">
                    mentorme.com/
                  </span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-white"
                
              >
                About
              </label>
              <div className="mt-2 bg-bluefill">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md bg-transparent border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                  value={about}
                onChange={(e) => setAbout(e.target.value)}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-300">
                Write a few sentences about yourself.
              </p>
            </div>


            {/* <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-white"
              >
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon
                  className="h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div> */}

            {/* <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-white"
              >
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-300">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        value={coverphoto}
                        onChange={(e) => setCoverPhoto(e.target.value)}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-300">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div> 
            </div> */}
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-white">
            Education {type === "student" ? "" : "and Work"}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-300">
            Enter your education and company details here
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {type === "student" ? (
              ""
            ) : (
              <>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Company
                  </label>
                  <div className="mt-2 bg-bluefill">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="block bg-transparent  w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Role
                  </label>
                  <div className="mt-2 bg-bluefill">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="block bg-transparent  w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-white"
              >
                Highest qualification
              </label>
              <div className="mt-2 bg-bluefill">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  value={highestQualification}
                  onChange={(e) => setHighestQualification(e.target.value)}
                  className="block bg-transparent  w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-white "
              >
                University
              </label>
              <div className="mt-2 bg-bluefill">
                <input
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="block w-full bg-transparent  rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-white"
              >
                CGPA
              </label>
              <div className="mt-2 bg-bluefill">
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  value={cgpa}
                  onChange={(e) => setCGPA(e.target.value)}
                  className="block w-full bg-transparent rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-white">
            Socials
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-300">
            Update your socials link here
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-white"
              >
                LinkedIn
              </label>
              <div className="mt-2 bg-bluefill">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  value={linkedIn}
                  onChange={(e) => setLinkedIn(e.target.value)}
                  className="block w-full bg-transparent  rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-white"
              >
                Github
              </label>
              <div className="mt-2 bg-bluefill">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="block w-full bg-transparent rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-white"
              >
                Leetcode
              </label>
              <div className="mt-2 bg-bluefill">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  value={leetcode}
                  onChange={(e) => setLeetcode(e.target.value)}
                  className="block w-full bg-transparent  rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-white"
              >
                Codechef
              </label>
              <div className="mt-2 bg-bluefill">
                <input
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  value={codechef}
                  onChange={(e) => setCodechef(e.target.value)}
                  className="block w-full bg-transparent  rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-white"
              >
                Portfolio
              </label>
              <div className="mt-2 bg-bluefill">
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  className="block w-full bg-transparent  rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-11/12 mx-auto mt-6 flex items-center justify-end gap-x-6 pb-10 md:w-8/12 lg:w-1/2">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={type==='student' ? handleStudentSave : handleMentorSave}
          className="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};
