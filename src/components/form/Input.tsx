// Types
import { InputField } from "../../abstraction/types/inputField.types";



export const Input = (inputField: InputField) => {
  return (
    <div className="my-4"> {/* Add some margin to the component */}
      <label className="block mb-2 ml-1 text-left">{inputField.labelText}</label>
      <div className="flex items-center border rounded-md p-2">
        {inputField.Icon}
        <input
          className="flex-1 ml-2 outline-none" // Flex to take remaining space, margin-left for some spacing
          type={inputField.type}
          placeholder={inputField.placeholder}
        />
      </div>
    </div>
  );
};
