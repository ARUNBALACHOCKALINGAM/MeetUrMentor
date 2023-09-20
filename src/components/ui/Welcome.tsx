export const Welcome = (props: {type: string,userType: string}) => {
  return (
    <div>
      <h1 className="text-xl text-neutral-800 text-left sm:text-3xl md:text-lg">Hi, Welcome back {props.userType}!</h1>
      <p className="text-xs text-left text-gray-400 mt-2 sm:text-sm">{props.type === "Login" ? "Login now to view progress" : "Already have an account? Log in"}</p>
    </div>
  );
};
