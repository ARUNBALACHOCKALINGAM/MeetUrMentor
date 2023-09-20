export const Welcome = (props: { type: string; userType: string }) => {
  return (
    <div>
      <h1 className="text-xl text-neutral-800 text-left sm:text-3xl md:text-lg">
        {props.type === "Signin" ? `Hi, Welcome back ${props.userType}!` : `SIGNUP AS A ${props.userType.toUpperCase()}`}
      </h1>
      {props.type === "Signin" ? (
        <p className="text-xs text-left text-gray-400 mt-2 sm:text-sm">
          Login now to view progress
        </p>
      ) : (
        <p className="text-xs text-left text-gray-400 mt-2 sm:text-sm">
          Already have an account? <a>Login</a>
        </p>
      )}
    </div>
  );
};
