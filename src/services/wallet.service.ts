import BaseHttpService from "./base.service";

const path = "wallets";

class WalletService extends BaseHttpService {
  constructor() {
    super();
  }

  getWallets = async () => {
    const result = await this.get(`${path}`);

    return result;
  };
}

const walletService = new WalletService();

export default walletService;
