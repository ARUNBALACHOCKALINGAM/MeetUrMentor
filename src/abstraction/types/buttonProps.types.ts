
type authFunction = () => void;

export interface ButtonProps{
    Icon?: JSX.Element;
    additionalStyling?: string;
    buttonText: string;
    onClick: authFunction
}