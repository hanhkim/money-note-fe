import axios, {
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import queryString from "query-string";
import { merge, set } from "lodash";
import authService from "./auth.service";
import { config } from "process";

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  paramsSerializer: (params) => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_k, v]) => v)
    );

    return queryString.stringify(params, { arrayFormat: "comma" });
  },
});

const getAccessToken = () => {
  const token = localStorage.getItem("accessToken");
  return token;
};

const getRefreshToken = () => {
  const token = localStorage.getItem("refreshToken");
  return token;
};

instance.interceptors.request.use(
  (value: InternalAxiosRequestConfig) => {
    const { headers, params, ...rest } = value;
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    const headerConfig: AxiosRequestHeaders = new AxiosHeaders({
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      Authorization: `Bearer ${accessToken}`,
      "R-Token": `${refreshToken}`,
      ...headers,
    });

    const config: InternalAxiosRequestConfig = {
      headers: headerConfig,
      params: { ...params },
      ...rest,
    };

    return config;
  },
  (error) => Promise.reject(error)
);

export const TOKEN_EXPIRED = {
  status: 21,
  message: "Token hết hạn",
};

export const TOKEN_INVALID = {
  status: 22,
  message: "Token hết hạn",
};

export const UnauthorizedCode = 401;

export const redirectToLogout = () => {
  console.log("redirectToLogout :>> ");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
};

export const checkTokenExpired = (data: any) => {
  // should update status code and message for all cases
  if (data.statusCode === UnauthorizedCode && data.message === "Unauthorized") {
  }
  return false;
};

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const config = response?.config || {};
    console.log("config :>> ", config);
    // if (
    //   config?.url?.indexOf("/login") >= 0 ||
    //   config?.url>.indexOf("/refresh") >= 0
    // ) {
    //   return response.data;
    // }
    // checkTokenExpired(response.data);
    return response.data;
  },
  async (error) => {
    console.log("error :>> ", error);
    const { message, config, response } = error;
    if (message === "Network Error") {
      console.log("Network Error");
      return response.data;
    } else {
      const errorToken = checkTokenExpired(response.data);
      console.log("errorToken :>> ", errorToken);
      if (errorToken) {
        const newAccessToken = await instance.post("/auth/refresh");

        console.log("newAccessToken :>> ", newAccessToken);
        if (newAccessToken) {
          console.log("set token laji ne :>> ");
          localStorage.setItem(
            "accessToken",
            newAccessToken.data?.access_token
          );
        }
        return Promise.resolve(true);
      } else {
        console.log("vao day khong :>> ", response);
        return Promise.reject(response.data);
      }
    }
  }
);

class BaseHttpService {
  private baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  private readonly instance: AxiosInstance;

  constructor(baseUrl?: any) {
    this.baseUrl = baseUrl || process.env.NEXT_PUBLIC_BASE_URL;
    this.instance = instance;
  }

  // getCommonOptions(): {
  //   headers?: {
  //     Authorization: string;
  //   };
  // } {
  //   if (typeof window !== "undefined") {
  //    const
  //     return {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };
  //   }
  //   return {};
  // }

  handleHttpError(error: any) {
    if (axios.isAxiosError(error) && !error?.response?.data) {
      set(error, "response.data", {
        statusCode: error.response?.status,
        message: error.message,
      });
    }
    const { statusCode, message } = error.response.data;
    if (statusCode !== 401) {
      throw new Error(message || error.message || "Unknown Error");
    } else {
      return this.handleUnauthorization();
    }
  }

  handleUnauthorization() {
    console.log("Unauthorization");
  }

  getFullUrl(endpoint: string) {
    return `${this.baseUrl}/${endpoint}`;
  }

  async get(endpoint: string, options = {}): Promise<any> {
    // merge(options, this.getCommonOptions());
    const fullUrl = `${this.baseUrl}/${endpoint}`;
    return this.instance.get(endpoint, options);
  }

  async post(endpoint: string, data = {}, options = {}): Promise<any> {
    // merge(options, this.getCommonOptions());
    const fullUrl = this.getFullUrl(endpoint);
    return this.instance.post(fullUrl, data, options);
  }

  async put(endpoint: string, data = {}, options = {}): Promise<any> {
    // merge(options, this.getCommonOptions());
    const fullUrl = this.getFullUrl(endpoint);
    return this.instance.put(fullUrl, data, options);
  }

  async delete(endpoint: string, options = {}): Promise<any> {
    // merge(options, this.getCommonOptions());
    const fullUrl = this.getFullUrl(endpoint);
    return this.instance.delete(fullUrl, options);
  }

  async patch(endpoint: string, data = {}, options = {}): Promise<any> {
    // merge(options, this.getCommonOptions());
    const fullUrl = this.getFullUrl(endpoint);
    return this.instance.patch(fullUrl, data, options);
  }
}

export default BaseHttpService;
