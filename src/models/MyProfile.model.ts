import { IWallet } from "./Wallet.model";

export interface IMyProfile {
  username: string;
  defaultWallet: IWallet | null;
  exp: number;
  iat: number;
  sub: string; // id
}
