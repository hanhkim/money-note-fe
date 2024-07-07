import { create } from "zustand";

export interface IGlobalStore {
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}

const useGlobalStore = create<IGlobalStore>((set) => ({
  isMobile: false,
  setIsMobile: (isMobile: boolean) => {
    set({ isMobile });
  },
}));

export { useGlobalStore };
