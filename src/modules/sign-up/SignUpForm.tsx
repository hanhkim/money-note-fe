import React from 'react';
import { useForm, FormProvider, SubmitHandler, useFormContext } from 'react-hook-form';
import { useSignUp } from './utils';
import InputField from '@/components/field/InputField';
import { Button } from '@nextui-org/react';
import ErrorText from '@/components/typography/ErrorText';
import { Link } from '@nextui-org/link';
import SelectField from '@/components/field/SelectField';
import { signUpSchema } from './SignUpForm.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import toast, { Toaster } from 'react-hot-toast';

export interface ISignUpDto {
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  firstName: string;
  lastName: string;
  gender: string;
}

const SignUpForm = () => {
  const { mutateAsync, errorMessage } = useSignUp();

  const methods = useForm<ISignUpDto>({
    resolver: yupResolver(signUpSchema),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const handleSubmitHandler: SubmitHandler<ISignUpDto> = async (values: ISignUpDto) => {
    await mutateAsync(values);
  };

  const genderOptions = [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'female',
    },
  ];

  return (
    <div className="w-80 mx-auto py-6">
      <p className="text-xl mb-6 mt-6 text-center font-bold">Create Account</p>
      <FormProvider {...methods}>
        <form className="flex gap-10 flex-col" autoComplete="off">
          <InputField
            label="Email"
            name="email"
            type="email"
            control={control}
            placeholder="Enter your email address"
            autoComplete="off"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            control={control}
            placeholder="Enter your password"
            autoComplete="new-password"
          />
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            control={control}
            placeholder="Confirm your password"
          />
          <InputField
            label="First name"
            name="firstName"
            type="text"
            control={control}
            placeholder="Enter your first name"
          />
          <InputField
            label="Last name"
            name="lastName"
            type="text"
            control={control}
            placeholder="Enter your last name"
          />
          <SelectField
            name="gender"
            control={control}
            options={genderOptions}
            placeholder="Choose gender"
            label="Gender"
          />
          <InputField
            label="Phone"
            name="phone"
            type="number"
            control={control}
            placeholder="Enter your number"
          />
          <Button
            fullWidth
            color="primary"
            type="submit"
            onClick={handleSubmit(handleSubmitHandler)}
          >
            Create Account
          </Button>
        </form>
      </FormProvider>
      <div className="mt-5">
        <p className="text-sm text-center text-gray-500 mb-10">
          Create an account so you can start to manage your money effectively
        </p>
        <Link size="sm" underline="always" href="/login">
          Already had an account?
        </Link>
      </div>
      <Toaster />
    </div>
  );
};

export default SignUpForm;
