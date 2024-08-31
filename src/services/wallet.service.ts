import { IWallet } from "@/models/Wallet.model";
import BaseHttpService from "./base.service";

const path = "wallets";

class WalletService extends BaseHttpService {
  constructor() {
    super();
  }

  getWallets = async (): Promise<IWallet[]> => {
    const result = await this.get(`${path}`);
    return result;
  };

  getWallet = async (id: string): Promise<IWallet> => {
    const result = await this.get(`${path}/${id}`);
    return result;
  };

  create = async (data: IWallet): Promise<IWallet> => {
    const result = await this.post(`${path}`, data);
    return result;
  };

  update = async (data: IWallet): Promise<IWallet> => {
    const result = await this.put(`${path}/${data.id}`, data);
    return result;
  };

  deleteWallet = async (id: string): Promise<IWallet> => {
    const result = await this.delete(`${path}/${id}`);
    return result;
  };

  setDefaultWallet = async (id: string): Promise<string> => {
    const result = await this.post(`${path}/set-default/${id}`);
    return result;
  };
}

const walletService = new WalletService();

export default walletService;
