import { AuthFormProps } from "../abstraction/types/authentication.types";

const Header = ({ userType }: AuthFormProps) => {
  // Define color themes for mentor and student
  const colors =
    userType === "mentor"
      ? {
          primary: "bg-gradient-to-b from-[#FF9100] to-[#FFC400]",
          accent: "text-[#DD2C00]",
          button: "bg-[#EA580C] hover:bg-[#ff7421]",
          border: "border-[#DD2C00]",
        }
      : {
          primary: "bg-gradient-to-b from-[#3b5998] to-[#8b9dc3]",
          accent: "text-[#60a5fa]",
          button: "bg-[#0866ff] hover:bg-[#145cd6]",
          border: "border-[#60a5fa]",
        };

  return (
    <div
      className="container px-5 py-6 pb-14 mt-10 text-left transition-opacity duration-300 sm:px-0 sm:py-20 sm:text-center"
      id="hero-text"
    >
      <p className="-mt-4 mb-7 sm:-mt-10 sm:mb-4">
        <button
          className={`rounded-md border border-dashed ${colors.border} px-3 py-1.5 ${colors.accent} transition-colors hover:text-opacity-80`}
        >
          <span className="hidden sm:inline">Inspired from roadmap.sh</span>
          <span className="inline text-sm sm:hidden">Build projects to skill up</span>
        </button>
      </p>
      <h1
        className={`mb-2 ${colors.primary} bg-clip-text text-2xl font-bold text-transparent sm:mb-4 sm:text-5xl sm:leading-tight`}
      >
        Choose your track
      </h1>
      <p className="hidden px-4 text-lg text-gray-400 sm:block">
        <span className={`font-medium ${colors.accent}`}>MentorMe</span> is a platform that focuses
        on role-based learning, <br/>offering resources and guides to help developers upskill in their chosen domain.
      </p>
      <p className="text-md block px-0 text-gray-400 sm:hidden">
        Community-driven roadmaps and guides for skill-based learning.
      </p>
      <button
        className={`${colors.button} text-white font-medium px-4 py-2 rounded mt-4`}
      >
        Learn More
      </button>
    </div>
  );
};

export default Header;
