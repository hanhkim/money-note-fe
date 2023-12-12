import dayjs from "dayjs";
import { create } from "zustand";

export interface ITransactionListStore {
  month: number;
  setMonth: (m: number) => void;
}

const useTransactionListStore = create<ITransactionListStore>((set) => ({
  month: dayjs().month(),
  setMonth: (m: number) => {
    set({ month: m });
  },
}));

export { useTransactionListStore };
