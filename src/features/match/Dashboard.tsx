import React from 'react'
import TodoList from './TodoList'
import { useSelector } from 'react-redux'
import { ProgressBar } from '../progress/ProgressBar';

export default function Dashboard() {

    const user = useSelector((state: any) => state.user);

    const colors: any =
    {
        mentor: {
            bg: "bg-[#FFF5E6]",
            border: "border-[#FFC400]",
            text: "text-[#FF8C00]",
            buttonBg: "bg-[#FFC400]",
            buttonHoverBg: "hover:bg-[#FFD966]",
        },
        student: {
            bg: "bg-[#EFF6FF]",
            border: "border-[#1D4ED8]",
            text: "text-[#1D4ED8]",
            buttonBg: "bg-[#1D4ED8]",
            buttonHoverBg: "hover:bg-[#3B82F6]",
        },
    };

    return (
        <div className='flex md:w-9/12 mx-auto justify-between mt-10 h-1/2 flex-wrap gap-6'>
            {/*Today's tasks*/}
            <div className='mr-6'>
                <TodoList role={user.userType} />
            </div>
            {/*Progress*/}
            <div className='w-full md:flex-1 flex flex-col'>
                <div className={`border-2 p-4 py-6 ${colors[user.userType].border} `}>
                    <h1 className={`${colors[user.userType].text} text-lg font-semibold`}>Progess</h1>
                    <ProgressBar progress={40} userType={user.userType} />
                </div>

                <div className={`border-2 p-4 py-6 flex-1 ${colors[user.userType].border} mt-6`}>
                    <h1 className={`${colors[user.userType].text} text-lg font-semibold`}>Mentor's Note</h1>
                    <p className={`${colors[user.userType].text} text-md`}>Focus!!!</p>
                </div>

            </div>

            {/*Articles and news - mentor's pick*/}
            <div>

            </div>

            {/*Job oppurtunities*/}
            <div>

            </div>
        </div>
    )
}
