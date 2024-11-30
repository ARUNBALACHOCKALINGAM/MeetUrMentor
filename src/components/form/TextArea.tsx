import { InputField } from "../../abstraction/types/inputField.types";

export const Textarea = ({
  value,
  placeholder,
  additionalStyling,
  labelText,
  errorMessage,
  Icon,
  onBlur,
  onChange,
  field,
  containerStyles,
  labelStyles
}: InputField) => {
  const handleChange = (eVal: string) => {
    onChange(eVal, field);
    onBlur(); // Reset error message on input change
  };

  return (
    <div className={`my-4`}>
      <label className={`block mb-2 ml-1 text-left ${labelStyles}`}>{labelText}</label>
      <div
        className={`${
          errorMessage && "border-orangejuice border-1 shadow-sm shadow-orangejuice"
        } flex items-start border rounded-md p-2 ${containerStyles} `}
      >
        {Icon}
        <textarea
          className={`${additionalStyling} flex-1 ml-2 outline-none resize-none`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={onBlur}
          rows={4} // Default rows, can be customized
        />
      </div>
      {errorMessage && (
        <p className="text-red-500 text-xs mt-1 text-left">{errorMessage}</p>
      )}
    </div>
  );
};
