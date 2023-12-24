import { ETransactionType } from "@/enums/Transaction.enum";

export interface ITransaction {
  id: string;

  amount: number;

  categoryId: number | null;

  note: string;

  date: Date;

  toWhom: string;

  img: any;

  walletId: string;

  type: ETransactionType;

  category: ICategory;
}

export interface ITransactionForm
  extends Omit<ITransaction, "categoryId" | "walletId" | "category" | "id"> {
  categoryId: number | null;
  walletId: null | string;
  id?: string;
}

export interface ICategory {
  id: number;
  name: string;
  parentId: number;
  type: string;
  icon?: string;
}
