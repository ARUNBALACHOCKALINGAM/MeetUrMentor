const Header = () => {
  return (
    <div className="w-full mb-20">
      <h1 className="mb-2 bg-gradient-to-b from-amber-50 to-purple-500 bg-clip-text text-md font-bold text-transparent sm:mb-4 sm:text-5xl">
        Choose a Track
      </h1>
      <p className="hidden px-4 text-lg text-gray-400 sm:block">
        {" "}
        <span className="font-medium text-gray-400">MentorMe</span> focuses on role or skill based learning and
        upskilling,<br/> Choose a particular role or skill from the options below to proceed.
      </p>
    </div>
  );
};

export default Header;
