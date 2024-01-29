import React from "react";
import {
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  SelectProps,
  VisuallyHidden,
  useRadio,
  cn,
  RadioProps,
} from "@nextui-org/react";
import { Controller, Control } from "react-hook-form";
import { ETransactionType } from "@/enums/Transaction.enum";

export interface ISelectField {
  name: string;
  control?: Control<any>;
  rules?: object;
  placeholder?: string;
  label?: string;
}

export interface ISelectOption {
  label: string;
  value: string | number;
}

const RadioGroupField: React.FC<ISelectField> = ({
  name,
  control,
  rules,

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
        console.log("value :>> ", value);
        return (
          <RadioGroup
            label=""
            orientation="horizontal"
            value={value}
            onChange={onChange}
          >
            <CustomRadio value={ETransactionType.EXPENSED}>
              Expensed
            </CustomRadio>
            <CustomRadio value={ETransactionType.EARNING}>Earned</CustomRadio>
            <CustomRadio value={ETransactionType.BORROWED_LENT}>
              Borrowed/Lent
            </CustomRadio>
          </RadioGroup>
        );
      }}
    />
  );
};

export default RadioGroupField;

export interface ICustomRadioProps extends RadioProps {
  children?: React.ReactNode;
}

export const CustomRadio: React.FC<ICustomRadioProps> = (props) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "m-0 hover:bg-content2 items-center border-1 grow-0 shrink-0 basic-1/3",
          "max-w-[300px] cursor-pointer rounded-lg gap-1 p-1 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
      }}
    >
      {children}
    </Radio>
  );
};
