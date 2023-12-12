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
}

const transactionService = new TransactionService();

export default transactionService;
