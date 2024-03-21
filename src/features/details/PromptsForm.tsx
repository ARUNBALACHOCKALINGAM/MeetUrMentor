// import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStudentDetails } from "../../data/store/student";
import { setMentorDetails } from "../../data/store/mentor";

type PromptsFormProps = {
  type: "student" | "mentor"; // Assuming type is a string, adjust accordingly
};

export const PromptsForm: React.FC<PromptsFormProps> = ({ type }) => {
  // states for each input
  //const [username, setUsername] = useState("");
  const [answerOne, setAnswerOne] = useState("");
  const [answerTwo, setAnswerTwo] = useState("");
  const [answerThree, setanswerThree] = useState("");
  

  const navigate = useNavigate();

  const dispatch = useDispatch();


  const trackDetails = useSelector((state: any) => type === "mentor" ? state.mentor.track : state.student.track);
  

  const handleStudentSave = () => {
    dispatch(
      setStudentDetails({
        answerOne: answerOne,
        answerTwo: answerTwo,
        answerThree: answerThree
      })
    );
    navigate("/");
  };

  const handleMentorSave = () => {
    dispatch(
      setMentorDetails({
        answerOne: answerOne,
        answerTwo: answerTwo,
        answerThree: answerThree
      })
    );
    navigate("/mentorhome");
  };

  return (
    <form>
      <div className="w-full mx-auto space-y-12 text-left p-2 shadow-sm sm:w-full md:w-8/12 lg:w-1/2">
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-white"
              >
                {type === "mentor" ? `Why do you want to teach ${trackDetails}?` : `Why do you want to learn ${trackDetails} ?`}
              </label>
              <div className="mt-2 bg-bluefill">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md bg-transparent border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                  value={answerOne}
                  onChange={(e) => setAnswerOne(e.target.value)}
                />
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-white"
              >
                {type === "mentor" ? `I feel like I’m good at ${trackDetails} because` : `I feel like I can learn ${trackDetails} because` }
              </label>
              <div className="mt-2 bg-bluefill">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md bg-transparent border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                  value={answerTwo}
                  onChange={(e) => setAnswerTwo(e.target.value)}
                />
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-white"
              >
                {type === "mentor" ? `What is your teaching method?` : `What kind of learning method you follow?` } 
              </label>
              <div className="mt-2 bg-bluefill">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md bg-transparent border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                  value={answerThree}
                  onChange={(e) => setanswerThree(e.target.value)}
                />
              </div>
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
   

      <div className="w-11/12 mx-auto mt-12 pb-12 flex items-center justify-end gap-x-6 md:w-8/12 lg:w-1/2">
        <button
          onClick={()=>navigate('/')}
          type="button"
          className="text-sm font-semibold leading-6 text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={type === "student" ? handleStudentSave : handleMentorSave}
          className="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};
