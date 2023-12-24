import { ITransaction } from "@/models/Transaction.model";
import BaseHttpService from "./base.service";

const path = "transactions";

class TransactionService extends BaseHttpService {
  constructor() {
    super();
  }

  getTransactions = (month: number) => {
    const params = { month };
    return this.get(path, { params });
  };

  addTransaction = (data: ITransaction) => {
    return this.post(path, data);
  };

  getTransaction = (id: string): Promise<ITransaction> => {
    return this.get(`${path}/${id}`);
  };
}

const transactionService = new TransactionService();

export default transactionService;
