import axios, {
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import queryString from "query-string";
import { set } from "lodash";
import {
  checkAccessTokenExpired,
  getAccessToken,
  getRefreshToken,
  redirectToLogout,
} from "@/helpers/service.helpers";

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  paramsSerializer: (params) => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_k, v]) => v)
    );
    console.log("filterParams :>> ", filteredParams);
    return queryString.stringify(params, { arrayFormat: "comma" });
  },
});

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

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const config = response?.config || {};
    return response.data;
  },
  async (error) => {
    const { message, config: originalRequest, response, status } = error;
    if (message === "Network Error") {
      return Promise.reject(response.data);
    }

    const isTokenExpired = checkAccessTokenExpired(
      response.data,
      response.status
    );

    if (isTokenExpired) {
      await handleTokenExpired(instance, originalRequest);
    }

    return Promise.reject(response.data);
  }
);

class BaseHttpService {
  private baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  private readonly instance: AxiosInstance;

  constructor(baseUrl?: any) {
    this.baseUrl = baseUrl || process.env.NEXT_PUBLIC_BASE_URL;
    this.instance = instance;
  }

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
    const fullUrl = `${this.baseUrl}/${endpoint}`;
    console.log("options :>> ", options);
    return this.instance.get(endpoint, options);
  }

  async post(endpoint: string, data = {}, options = {}): Promise<any> {
    const fullUrl = this.getFullUrl(endpoint);
    return this.instance.post(fullUrl, data, options);
  }

  async put(endpoint: string, data = {}, options = {}): Promise<any> {
    const fullUrl = this.getFullUrl(endpoint);
    return this.instance.put(fullUrl, data, options);
  }

  async delete(endpoint: string, options = {}): Promise<any> {
    const fullUrl = this.getFullUrl(endpoint);
    return this.instance.delete(fullUrl, options);
  }

  async patch(endpoint: string, data = {}, options = {}): Promise<any> {
    const fullUrl = this.getFullUrl(endpoint);
    return this.instance.patch(fullUrl, data, options);
  }
}

export default BaseHttpService;

export const getRefreshTokenService = async () => {
  const refreshApi = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`;
  const refreshT = getRefreshToken();
  const axios2: AxiosInstance = axios.create();
  const result = await axios2
    .get(refreshApi, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        Authorization: `Bearer ${refreshT}`,
      },
    })
    .then(function (response) {
      console.log("response :>> ", response);
      localStorage.setItem("accessToken", response.data?.accessToken);
      return response.data;
    })
    .catch(function (err) {
      redirectToLogout();
    });

  return result?.accessToken;
};

////////////////// helpers
export const handleTokenExpired = async (
  instance: AxiosInstance,
  originalRequest: any
) => {
  const accessToken = await getRefreshTokenService();

  if (!accessToken) {
    return (window.location.href = "/login");
  }
  originalRequest.headers["Authorization"] = `Bearer ` + accessToken;

  return instance(originalRequest);
};
