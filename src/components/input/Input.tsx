import React from "react";
import { Input as NuiInput, InputProps } from "@nextui-org/react";

export interface IInput extends InputProps {}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  labelPlacement = "outside",
  size = "md",
  ...rest
}) => {
  return (
    <NuiInput
      type={type}
      placeholder={placeholder}
      labelPlacement={labelPlacement}
      size={size}
      {...rest}
    />
  );
};

export default Input;
