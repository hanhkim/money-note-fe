import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useLogin } from "./utils";
import InputField from "@/components/field/InputField";
import { Button } from "@nextui-org/react";
import ErrorText from "@/components/typography/ErrorText";
import { Link } from "@nextui-org/link";

export interface ILoginDto {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { mutateAsync, errorMessage } = useLogin();

  const methods = useForm<ILoginDto>();
  const { handleSubmit, control } = methods;

  const onSubmitHandler: SubmitHandler<ILoginDto> = async (values) => {
    await mutateAsync(values);
  };

  return (
    <div className="w-80 mx-auto py-10">
      <p className="text-xl mb-6 mt-10 text-center font-bold">Login</p>
      <p className="text-sm text-center text-gray-500 mb-10">
        Hello friend! Welcome back you&apos;ve been missed!
      </p>
      <FormProvider {...methods}>
        <form className="flex gap-10 flex-col ">
          <InputField
            label="Email"
            name="email"
            type="email"
            control={control}
            placeholder="Enter your email address"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            control={control}
            placeholder="Enter your password"
          />
          <ErrorText message={errorMessage} />
          <Button
            fullWidth
            type="submit"
            onClick={handleSubmit(onSubmitHandler)}
            color="primary"
            size="lg"
          >
            Login
          </Button>
        </form>
      </FormProvider>
      <div className="mt-5">
        <Link size="sm" underline="always" href="#">
          Forgot your password?
        </Link>
        <br />
        <Link size="sm" underline="always" href="sign-up">
          or Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
