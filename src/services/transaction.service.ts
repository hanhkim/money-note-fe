import { ITransaction } from "@/models/Transaction.model";
import BaseHttpService from "./base.service";

const path = "transactions";

class TransactionService extends BaseHttpService {
  constructor() {
    super();
  }

  getTransactions = () => {
    return this.get(path);
  };

  addTransaction = (data: ITransaction) => {
    return this.post(path, data);
  };
}

const transactionService = new TransactionService();

export default transactionService;
