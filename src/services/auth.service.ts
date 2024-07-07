import { ISignUpDto } from "@/modules/sign-up/SignUpForm";
import BaseHttpService from "./base.service";
import { IMyProfile } from "@/models/MyProfile.model";

const path = "auth";

export interface ILoginDto {
  email: string;
  password: string;
}

class AuthService extends BaseHttpService {
  constructor() {
    super();
  }

  login = async (data: ILoginDto) => {
    const result = await this.post(`${path}/login`, data);
    return result;
  };

  register = async (data: ISignUpDto) => {
    const result = await this.post(`${path}/register`, data);
    return result;
  };

  refreshToken = async () => {
    const result = await this.post(`${path}/refresh`);
    return result;
  };

  getProfile = async (): Promise<IMyProfile> => {
    const result = await this.get(`${path}/profile`);
    return result;
  };

  logout = async () => {
    const result = await this.get(`${path}/logout`);
    return result;
  };
}

const authService = new AuthService();

export default authService;
