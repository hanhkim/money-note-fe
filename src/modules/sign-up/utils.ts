import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ISignUpDto } from "./SignUpForm";
import authService from "@/services/auth.service";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useGetProfile } from "@/hooks/useGetProfile";

export const useSignUp = () => {
  const router = useRouter();
  const { getProfile } = useGetProfile();
  const queryClient = useQueryClient();

  const { mutateAsync, error } = useMutation({
    mutationKey: ["register"],
    mutationFn: (values: ISignUpDto) => authService.register(values),
    onSuccess: async (result: ISignUpDto) => {
      toast.success("Sign up successfully, now you can login");

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    },
    onError: (error) => {},
  });

  return {
    mutateAsync,
    errorMessage: error?.message,
  };
};
