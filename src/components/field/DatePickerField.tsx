import React from "react";
import { InputProps } from "@nextui-org/react";
import { Controller, Control } from "react-hook-form";
import DatePicker from "../date-picker/DatePicker";

export interface IDatePickerField extends InputProps {
  name: string;
  control?: Control<any>;
  rules?: object;
}

const DatePickerField: React.FC<IDatePickerField> = ({
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
      }) => <DatePicker value={value} onChange={onChange} />}
    />
  );
};

export default DatePickerField;
