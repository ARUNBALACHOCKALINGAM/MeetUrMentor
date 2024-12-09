import { SideBar } from '../layouts/SideBar';
import { Logo } from '../layouts/Logo';
import { useSelector } from 'react-redux';
import { UserState } from '../abstraction/types/userData.types';
import React from 'react';

export const Home = ({ children }: { children: React.ReactElement }) => {
  const userType = useSelector((state: UserState) => state.user.userType);

  // Clone the children to inject userType as a prop
  const childrenWithProps = React.cloneElement(children, { userType });

  return (
    <div className="flex w-screen h-screen">
      <SideBar />

      {/* Main Content Area */}
      <div className="flex flex-col items-center z-10 w-full lg:mt-8">
        {/* Centered Logo */}
        <Logo userType={userType} />

        {/* Profile Card Section */}
        <div className="mt-[1.5%] w-[98%] lg:w-[80%] lg:h-5/6">
          {childrenWithProps}
        </div>
      </div>
    </div>
  );
};
