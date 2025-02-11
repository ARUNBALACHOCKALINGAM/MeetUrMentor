import { SideBar } from '../layouts/SideBar';
import { Logo } from '../layouts/Logo';
import { useSelector } from 'react-redux';
import { UserState } from '../abstraction/types/userData.types';
import React, { useEffect } from 'react';
import { useAppDispatch } from '../utils/hooks/useAppDispatch';
import { fetchMatchedUserDetails, fetchUserDetails } from '../data/store/user';

export const Home = ({ children }: { children: React.ReactElement }) => {
  const user = useSelector((state: UserState) => state.user);
  

  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(fetchUserDetails(localStorage.getItem("email")));
  },[dispatch]);



  useEffect(()=>{
    dispatch(fetchMatchedUserDetails(user.matchedUser));
  },[dispatch,user.matchedUser])

  // Clone the children to inject userType as a prop
  const childrenWithProps = React.cloneElement(children, { userType: user.userType });

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <SideBar />

      {/* Main Content Area */}
      <div className="flex flex-col items-center z-10 w-full lg:mt-8">
        {/* Centered Logo */}
        <Logo userType={user.userType} />

        {/* Profile Card Section */}
        <div className="mt-10 h-screen overflow-y-auto drop-shadow-md lg:mt-[1.5%] w-[98%] lg:w-9/12 lg:h-5/6">
          {childrenWithProps}
        </div>
      </div>
    </div>
  );
};
