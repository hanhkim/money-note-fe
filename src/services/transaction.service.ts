import BaseHttpService from "./base.service";

const path = "categories";

class TransactionService extends BaseHttpService {
  constructor() {
    super();
  }

  getCategoryById = (id: string) => {
    return this.get(`account/${id}`); // update
  };
}

const transactionService = new TransactionService();

export default transactionService;
