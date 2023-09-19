// Types
import { ButtonProps } from "../../abstraction/types/buttonProps.types";

export const Button = (buttonProps: ButtonProps) => {

  return (
    <button className={`${buttonProps.color} flex items-center justify-center p-2 w-full rounded-md shadow-sm shadow-orange-500`}>
      {buttonProps.Icon}
      <p className={buttonProps.Icon ? "ml-4" : "mx-auto"}>{buttonProps.buttonText}</p>
    </button>
  );
};
