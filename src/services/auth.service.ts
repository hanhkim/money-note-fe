import BaseHttpService from "./base.service";

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

  refreshToken = async () => {
    const result = await this.post(`${path}/refresh`);
    return result;
  };
}

const authService = new AuthService();

export default authService;
