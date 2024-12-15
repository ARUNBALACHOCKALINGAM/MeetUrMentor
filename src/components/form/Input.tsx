// Types
import { InputField } from "../../abstraction/types/inputField.types";

export const Input = ({type,disabled,value,placeholder,additionalStyling,labelText,errorMessage,Icon,onBlur,onChange,field,containerStyles,labelStyles}: InputField) => {

  const handleChange = (eVal:string) => {
    onChange(eVal,field);
    onBlur() // Reset error message on input change
  };


  return (
    <div className={`my-2`}>
      <label className={`block mb-2 ml-1 text-left ${labelStyles}`}>{labelText}</label>
      <div className={`${errorMessage && "border-orangejuice border-1 shadow-sm shadow-orangejuice"} flex items-center border rounded-md p-2 ${containerStyles}`}>
        {Icon}
        <input
          className={`${additionalStyling} w-full flex-1 ml-2 outline-none`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={onBlur}
        />
      </div>
      {errorMessage && <p className="text-red-500 text-xs mt-1 text-left">{errorMessage}</p>}
    </div>
  );
};
