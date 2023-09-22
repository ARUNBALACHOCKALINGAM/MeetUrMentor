export interface InputField {
    labelText: string;
    Icon: JSX.Element;
    placeholder: string;
    errorMessage: string;
    type: string;
    value: string;
    onChange: (value: string) => void; // Function that takes a string argument and returns void
    onBlur: () => void; // Function that takes no arguments and returns void
  }
  