import React from "react";
import { Select, SelectItem, SelectProps } from "@nextui-org/react";
import { Controller, Control } from "react-hook-form";

export interface ISelectField {
  name: string;
  control?: Control<any>;
  rules?: object;
  options: ISelectOption[];
  placeholder?: string;
  label?: string;
}

export interface ISelectOption {
  label: string;
  value: string | number;
}

const SelectField: React.FC<ISelectField> = ({
  name,
  control,
  rules,
  options = [],
  placeholder,
  label,
}) => {
  const [values, setValues] = React.useState(new Set([]));

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onBlur, onChange, value },
        fieldState: { invalid, error },
      }) => {
        const selectedKeys = value
          ? Array.isArray(value)
            ? value
            : [value.toString()]
          : [];

        return (
          <Select
            placeholder={placeholder}
            className="w-full"
            onChange={onChange}
            // selectedKeys={selectedKeys}
            defaultSelectedKeys={selectedKeys}
            items={options}
            label={label}
            isInvalid={!!error}
            errorMessage={error?.message}
          >
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        );
      }}
    />
  );
};

export default SelectField;
