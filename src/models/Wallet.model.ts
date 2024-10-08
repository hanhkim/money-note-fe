export interface IWallet {
  id?: string;
  name: string;
  amount: number;
  createAt?: string;
  updatedAt?: string;
  imgUrl?: string;
  description?: string;
  currencyUnit?: string;
  isDefault: boolean;
  totalIncome: number;
  totalExpense: number;
  transferAmount: number;
  receiveAmount: number;
}
