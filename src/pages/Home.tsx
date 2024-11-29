import React from 'react';
import { PersonalCard } from '../features/match/PersonalCard';
import { SideBar } from '../layouts/SideBar';
import { Logo } from '../layouts/Logo';
import { useSelector } from 'react-redux';

export const Home = () => {
  const userType = useSelector((state: any) => state.user.userType);

  return (
    <div className="flex w-screen h-screen">
      <SideBar />

      {/* Main Content Area */}
      <div className="flex flex-col items-center z-10 w-full lg:mt-8">
        {/* Centered Logo */}
        <Logo userType={userType} />

        {/* Profile Card Section */}
        <div className="w-full md:w-full lg:w-full">
          <PersonalCard />
        </div>
      </div>
    </div>
  );
};
