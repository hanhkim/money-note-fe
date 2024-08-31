import { useMemo } from "react";
import { IMyProfile } from "@/models/MyProfile.model";

export const useMyProfile = (): IMyProfile | null => {
  const myProfile =
    typeof window !== "undefined" ? localStorage?.getItem("myProfile") : "";

  return useMemo(() => {
    return myProfile ? (JSON.parse(myProfile) as IMyProfile) : null;
  }, [myProfile]);
};
