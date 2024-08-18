import { UNAUTHORIZED } from "@/constants/statusCode.constants";
import { AxiosInstance } from "axios";

export const getAccessToken = () => {
  const token = localStorage.getItem("accessToken");
  return token;
};

export const getRefreshToken = () => {
  const token = localStorage.getItem("refreshToken");
  return token;
};

export const redirectToLogout = () => {
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");

  window.location.href = "/login";
};

export const checkAccessTokenExpired = (data: any, status: number) =>
  status === UNAUTHORIZED.status && data.message === UNAUTHORIZED.message;
