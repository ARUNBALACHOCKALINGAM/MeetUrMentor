import './styles/Button.css'

// Types
import { ButtonProps } from "../../abstraction/types/buttonProps.types";

export const Button = (buttonProps: ButtonProps) => {

  return (
    <button className={`flex items-center justify-center mt-4 p-2 w-full rounded-md shadow-sm ${buttonProps.additionalStyling}`}>
      {buttonProps.Icon}
      <p className={buttonProps.Icon ? "hidden md:text-sm ml-2 md:block" : "mx-auto"}>{buttonProps.buttonText}</p>
    </button>
  );
};
