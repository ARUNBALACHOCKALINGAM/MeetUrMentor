// Types
import { InputField } from "../../abstraction/types/inputField.types";

export const Input = (props: InputField) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value);
    props.onBlur() // Reset error message on input change
  };


  return (
    <div className="my-4">
      <label className="block mb-2 ml-1 text-left">{props.labelText}</label>
      <div className={`${props.errorMessage && "border-orangejuice border-1 shadow-sm shadow-orangejuice"} flex items-center border rounded-md p-2`}>
        {props.Icon}
        <input
          className="flex-1 ml-2 outline-none "
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={handleChange}
          onBlur={props.onBlur}
        />
      </div>
      {props.errorMessage && <p className="text-red-500 text-xs mt-1 text-left">{props.errorMessage}</p>}
    </div>
  );
};
