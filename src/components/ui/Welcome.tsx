export const Welcome = (prop: {type: string}) => {
  return (
    <div>
      <h1 className="text-neutral-800">Hi, Welcome back!</h1>
      <p className="text-left text-gray-400 mt-2">{prop.type === "Login" ? "Login now to view progress" : "Already have an account? Log in"}</p>
    </div>
  );
};
