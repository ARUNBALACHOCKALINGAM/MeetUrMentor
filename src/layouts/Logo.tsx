import { AuthFormProps } from '../abstraction/types/authentication.types';
import { FaExchangeAlt } from 'react-icons/fa';

export const Logo = ({ userType }: AuthFormProps) => {
  const colors =
    userType === 'mentor'
      ? {
          primaryText: 'text-[#FF8C00]', // Orange for mentors
          actionText: 'text-[#FF5714]', // Stronger orange for action
        }
      : {
          primaryText: 'text-[#1D4ED8]', // Blue for learners
          actionText: 'text-[#0C4A6E]', // Stronger blue for action
        };

  return (
    <div className={`flex w-11/12 justify-end items-center mx-auto mt-6 lg:w-8/12 md:justify-between self-start`}>
      {/* Change Track Section */}
      <div className="flex text-xs items-center justify-end w-full lg:justify-start">
        <FaExchangeAlt className={`text-sm mr-2 ${colors.actionText}`} />
        <h1 className={`text-base font-light ${colors.actionText}`}>Change Track</h1>
      </div>

      {/* MentorMe Section (Hidden on Small Screens) */}
      <h1
        className={`text-2xl font-medium italic ${colors.primaryText} hidden md:hidden lg:block`}
      >
        MentorMe
      </h1>
    </div>
  );
};
