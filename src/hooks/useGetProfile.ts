import { useMutation, useQuery } from "@tanstack/react-query";
import authService from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { IMyProfile } from "@/models/MyProfile.model";

export const useGetProfile = () => {
  const { mutateAsync } = useMutation({
    mutationKey: ["authService.getProfile"],
    mutationFn: () => authService.getProfile(),
    onSuccess: (result: IMyProfile) => {
      localStorage.setItem("myProfile", JSON.stringify(result));
      return result;
    },
  });

  return {
    getProfile: mutateAsync,
  };
};
