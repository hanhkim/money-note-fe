import { ITransaction } from "@/models/Transaction.model";
import { IWallet } from "@/models/Wallet.model";
import dayjs from "dayjs";
import { create } from "zustand";

export interface ITransactionListStore {
  month: number;
  selectedWalletId: string | null;
  setMonth: (m: number) => void;
  setSelectedWalletId: (wallet: string | null) => void;
}

const useTransactionListStore = create<ITransactionListStore>((set) => ({
  selectedWalletId: null,
  month: dayjs().month(),
  setMonth: (m: number) => {
    set({ month: m });
  },
  setSelectedWalletId: (walletId: string | null) => {
    set({ selectedWalletId: walletId });
  },
}));

export interface ITransactionDetailStore {
  selectedTransactionId: null | string;
  openTransactionModal: boolean;
  detailTransaction: null | ITransaction;
  setDetailTransaction: (data: ITransaction | null) => void;
  setOpenTransactionModal: (open: boolean) => void;
  setSelectedTransactionId: (id: string | null) => void;
}

const useTransactionDetailStore = create<ITransactionDetailStore>((set) => ({
  selectedTransactionId: null,
  openTransactionModal: false,
  detailTransaction: null,
  setDetailTransaction: (data: ITransaction | null) => {
    set({ detailTransaction: data });
  },
  setOpenTransactionModal: (open: boolean) =>
    set({ openTransactionModal: open }),
  setSelectedTransactionId: (id: string | null) =>
    set({ selectedTransactionId: id }),
}));

export { useTransactionListStore, useTransactionDetailStore };
