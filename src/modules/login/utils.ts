import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ILoginDto } from "./LoginForm";
import authService from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useGetProfile } from "@/hooks/useGetProfile";

export const useLogin = () => {
  const router = useRouter();
  const { getProfile } = useGetProfile();
  const queryClient = useQueryClient();

  const { mutateAsync, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: (values: ILoginDto) => authService.login(values),
    onSuccess: async (result) => {
      localStorage.setItem("accessToken", result?.accessToken);
      localStorage.setItem("refreshToken", result?.refreshToken);
      const myProfile = await getProfile();
      console.log("myProfile :>> ", myProfile);
      if (myProfile.defaultWallet) {
        return router.push("/transactions");
      }
      return router.push("/wallets");
    },
    onError: (error) => {
      console.log("error :>> ", error);
    },
  });

  return {
    mutateAsync,
    errorMessage: error?.message,
  };
};
