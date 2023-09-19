// section below the form inputs

export const RememberSection = () => {
    return (
      <div className="flex items-center justify-between text-sm mt-4 p-2">
        <div className="flex items-center">
          <input type="checkbox" id="remember" className="mr-2 default:ring-2 indeterminate:bg-gray-300 " />
          <label htmlFor="remember">Remember me</label>
        </div>
        <a className="text-sm">Forgot password?</a>
      </div>
    );
  };
  