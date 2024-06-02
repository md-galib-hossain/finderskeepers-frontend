
import { decodedToken } from "./jwt";

export const setToLocalStorage = (key: string, token: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.setItem(key, token);
};

export const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};
export const getUserFromLocalStorage = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return null;
  }
  const user : any = decodedToken(token);
  return user;
};

export const removeFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.removeItem(key);
};

