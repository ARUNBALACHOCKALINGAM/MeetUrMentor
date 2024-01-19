import { useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import { useDispatch } from "react-redux";
import { setMentorTrack } from "../data/store/mentor";
import { setStudentTrack } from "../data/store/student";

const Track = () => {
  const roles = [
    "Frontend",
    "Backend",
    "Devops",
    "Fullstack",
    "Android",
    "AI and data scientist",
    "BlockChain",
    "Game developer",
    "Technical writer",
    "React",
    "React Native",
    "Flutter"
  ];

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const type = window.location.pathname;

  const handleMentorRole = (role: string) => {
    console.log(role);
    dispatch(setMentorTrack({track: role}));
    navigate('/mentorprompts');
  }

  const handleStudentRole = (role: string) => {
    dispatch(setStudentTrack({track: role}));
    navigate('/studentprompts');
  }


  return (
    <div className="w-screen h-screen bg-bluebg flex flex-col justify-center">
      <Header />
      <div className="mb-20">
        <div className="w-full flex items-center">
          <hr className="flex-grow border-bordercolor" />
          <div className="bg-slate-900 font-regular px-3 py-1 rounded-md text-slate-400 border-bordercolor border-2">
            <h3>Role Based Tracks</h3>
          </div>
          <hr className="flex-grow border-bordercolor" />
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 mx-auto w-1/2 p-8 text-md">
          {roles.map((role) => {
            return (
              <button key={role} onClick={() => type==="/mentortrack" ? handleMentorRole(role) : handleStudentRole(role)} className="border border-slate-800 bg-slate-900 p-2.5  sm:p-3.5 block no-underline rounded-lg relative text-slate-400 font-regular text-md hover:border-slate-600 hover:text-slate-100 text-slate-400 p-4  border-bordercolor border-2 rounded-md">
                {role}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Track;
