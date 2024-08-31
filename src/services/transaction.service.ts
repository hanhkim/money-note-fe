import { ITransaction } from "@/models/Transaction.model";
import BaseHttpService from "./base.service";

const path = "transactions";

interface ITransactionsRequest {
  month?: number;
  walletId?: string;
}

class TransactionService extends BaseHttpService {
  constructor() {
    super();
  }

  getTransactions = (params: ITransactionsRequest) => {
    return this.get(path, { params });
  };

  addTransaction = (data: ITransaction) => {
    return this.post(path, data);
  };

  getTransaction = (id: string): Promise<ITransaction> => {
    return this.get(`${path}/${id}`);
  };

  deleteTransaction = (id: string): Promise<any> => {
    return this.delete(`${path}/${id}`);
  };
}

const transactionService = new TransactionService();

export default transactionService;
