import React from "react";
import { Select, SelectItem, SelectProps } from "@nextui-org/react";
import { Controller, Control } from "react-hook-form";

export interface ISelectField {
  name: string;
  control?: Control<any>;
  rules?: object;
  options: ISelectOption[];
}

export interface ISelectOption {
  label: string;
  value: string;
}

const SelectField: React.FC<ISelectField> = ({
  name,
  control,
  rules,
  options,
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
        <Select
          placeholder="Select an animal"
          className="w-full"
          onChange={onChange}
        >
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
      )}
    />
  );
};

export default SelectField;
