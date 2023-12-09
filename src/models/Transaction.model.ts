import { ETransactionType } from "@/enums/Transaction.enum";

export interface ITransaction {
  id: string;

  amount: number;

  categoryId: number;

  note: string;

  date: Date;

  toWhom: string;

  img: string;

  walletId: string;

  type: ETransactionType;
}
