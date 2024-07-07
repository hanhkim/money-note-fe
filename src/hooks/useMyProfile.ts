import { IMyProfile } from "@/models/MyProfile.model";

export const useMyProfile = (): IMyProfile | null => {
  const myProfile = localStorage?.getItem("myProfile") || "";
  return myProfile ? (JSON.parse(myProfile) as IMyProfile) : null;
};
