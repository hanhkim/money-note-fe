import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useLogin } from "./utils";
import InputField from "@/components/field/InputField";
import { Button } from "@nextui-org/react";
import ErrorText from "@/components/typography/ErrorText";

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
      <p className="text-xl mb-4 text-center font-bold">Login</p>
      <FormProvider {...methods}>
        <form className="flex gap-10 flex-col ">
          <InputField
            label="Email"
            name="email"
            type="email"
            control={control}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            control={control}
          />
          <ErrorText message={errorMessage} />
          <Button
            fullWidth
            type="submit"
            onClick={handleSubmit(onSubmitHandler)}
          >
            Login
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
