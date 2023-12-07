import { useMutation } from "@tanstack/react-query";
import { ILoginDto } from "./LoginForm";
import authService from "@/services/auth.service";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();

  const { mutateAsync, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: (values: ILoginDto) => authService.login(values),
    onSuccess: (result) => {
      console.log("result :>> ", result);
      localStorage.setItem("accessToken", result?.accessToken);
      localStorage.setItem("refreshToken", result?.refreshToken);
      router.push("/transactions");
    },
  });

  return {
    mutateAsync,
    errorMessage: error?.message,
  };
};
