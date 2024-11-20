import React from 'react';
import { Input, InputProps } from '@nextui-org/react';
import { Controller, Control } from 'react-hook-form';

export interface IInputField extends InputProps {
  name: string;
  control?: Control<any>;
  rules?: object;
}

const InputField: React.FC<IInputField> = ({ name, defaultValue, control, rules, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onBlur, onChange, value }, fieldState: { invalid, error } }) => {
        return (
          <Input
            value={value}
            onChange={onChange}
            isInvalid={!!error}
            errorMessage={error?.message}
            className="rounded"
            {...rest}
          />
        );
      }}
    />
  );
};

export default InputField;
