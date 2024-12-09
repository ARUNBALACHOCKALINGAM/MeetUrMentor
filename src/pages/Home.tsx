
import { PersonalCard } from '../features/match/PersonalCard';
import { SideBar } from '../layouts/SideBar';
import { Logo } from '../layouts/Logo';
import { useSelector } from 'react-redux';
import { UserState } from '../abstraction/types/userData.types';
import { Chat } from '../features/chat/Chat';
import { Tasks } from '../features/tasks/Tasks';

export const Home = () => {
  const userType = useSelector((state: UserState) => state.user.userType);

  return (
    <div className="flex w-screen h-screen">
      <SideBar />

      {/* Main Content Area */}
      <div className="flex flex-col items-center z-10 w-full lg:mt-8">
        {/* Centered Logo */}
        <Logo userType={userType} />

        {/* Profile Card Section */}
        <div className="mt-8 w-[98%] lg:w-[80%] lg:h-5/6">
          {/* <PersonalCard userType={userType}/> */}
          {/* <Chat userType={userType}/> */}
          <Tasks/>
        </div>
      </div>
    </div>
  );
};
