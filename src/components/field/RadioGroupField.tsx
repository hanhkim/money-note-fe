import React from 'react';
import { Radio, RadioGroup, cn, RadioProps } from '@nextui-org/react';
import { Controller, Control } from 'react-hook-form';
import { ETransactionType } from '@/enums/Transaction.enum';
import classNames from 'classnames';

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
      render={({ field: { onBlur, onChange, value }, fieldState: { invalid, error } }) => {
        return (
          <RadioGroup
            label="Type"
            orientation="horizontal"
            value={value}
            onChange={onChange}
            classNames={{
              wrapper: 'grid grid-cols-3 gap-0 border-1 border-primary rounded-md',
              label: 'text-black',
            }}
          >
            <CustomRadio
              value={ETransactionType.EXPENSED}
              isSelected={value === ETransactionType.EXPENSED}
              className="border-r-1 border-r-primary"
            >
              Expensed
            </CustomRadio>
            <CustomRadio
              value={ETransactionType.EARNING}
              isSelected={value === ETransactionType.EARNING}
            >
              Earned
            </CustomRadio>
            <CustomRadio
              value={ETransactionType.BORROWED_LENT}
              isSelected={value === ETransactionType.BORROWED_LENT}
              className="border-l-1 border-l-primary"
            >
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
  isSelected?: boolean;
}

export const CustomRadio: React.FC<ICustomRadioProps> = (props) => {
  const { children, isSelected, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          'm-0 flex justify-center items-center grow-0 shrink-0',
          'max-w-[300px] cursor-pointer border-2 border-transparent',
          'data-[selected=true]:bg-primary [&_data-[selected=true]>span]:text-white !data-[selected=true]:text-white'
        ),
        wrapper: 'hidden',
        label: `${classNames({
          'label-custom text-sm text-primary': true,
          'text-primary': !isSelected,
          'text-white': isSelected,
        })}`,
        labelWrapper: 'ml-0 text-white',
      }}
      // className="grid grid-cols-3"
    >
      {children}
    </Radio>
  );
};
