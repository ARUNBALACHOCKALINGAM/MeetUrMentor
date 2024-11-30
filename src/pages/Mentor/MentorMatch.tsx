import { PersonalCard } from "../../features/match/PersonalCard";
import { WorkInfo } from "../../features/match/WorkInfo";
//import Header from "../layouts/Header";

const MentorMatch = () => {
    return (
        <div className="w-screen h-screen mx-auto text-center flex bg-gray-900">
            <div className="flex lg:w-10/12 h-fit mx-auto mt-20 p-5 border-2 border-indigo-600 shadow-lg shadow-indigo-500/40">
                <PersonalCard />
                <WorkInfo />
            </div>
        </div>
    );
};

export default MentorMatch;
