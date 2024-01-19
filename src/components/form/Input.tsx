// Types
import { InputField } from "../../abstraction/types/inputField.types";

export const Input = (props: InputField) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value);
    props.onBlur() // Reset error message on input change
  };


  return (
    <div className="my-4 ">
      <label className="block mb-2 ml-1 text-left">{props.labelText}</label>
      <div className={`${props.errorMessage && "border-purple-600 border-1  shadow-sm shadow-purple-600"} flex items-center border border-gray-600 rounded-md p-2 bg-bluefill `}>
        {props.Icon}
        <input
          className="flex-1 ml-2 outline-none bg-bluefill"
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={handleChange}
          onBlur={props.onBlur}
        />
      </div>
      {props.errorMessage && <p className="text-purple-600 text-xs mt-1 text-left">{props.errorMessage}</p>}
    </div>
  );
};
