import React from "react";
import { Input, InputProps, Textarea, TextAreaProps } from "@nextui-org/react";
import { Controller, Control } from "react-hook-form";

export interface ITextareaField extends TextAreaProps {
  name: string;
  control?: Control<any>;
  rules?: object;
}

const TextareaField: React.FC<ITextareaField> = ({
  name,
  defaultValue,
  control,
  rules,
  placeholder,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onBlur, onChange, value },
        fieldState: { invalid, error },
      }) => (
        <Textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...rest}
        />
      )}
    />
  );
};

export default TextareaField;
