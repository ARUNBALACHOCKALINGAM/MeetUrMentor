type BannerProps = { 
  userType: any; // Assuming type is a string, adjust accordingly
};

export const Banner: React.FC<BannerProps> = ({ userType }) => {
  const isStudent = userType === "student";

  return (
    <div className="text-center">
      <h1
        className={`${
          isStudent ? "text-[#4267B2]" : "text-[#FF7324]"
        } font-extrabold text-2xl lg:text-4xl`}
      >
        {userType === "mentor"
              ? "Share Your Knowledge"
              : "Let's Begin Your Journey"}
      </h1>
      <p
        className={`${
          isStudent ? "text-[#8B9DC3]" : "text-[#FFA863]"
        } mt-4 text-lg`}
      >
        Please fill in the details
      </p>
      <hr
        className={`${
          isStudent ? "bg-[#8B9DC3]" : "bg-[#FFA863]"
        } mt-4 h-px border-0`}
      />
    </div>
  );
};
