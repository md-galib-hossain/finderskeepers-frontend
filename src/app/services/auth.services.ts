import { authKey } from "@/constants/authKey";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import { decodedToken } from "@/utils/jwt";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/local-storage";

export const storeUserInfo = (accessToken: string) => {
  return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authToken: string | any = getFromLocalStorage(authKey);
  
  if (authToken && authToken !== 'undefined') {
    const decodedData: any = decodedToken(authToken);
    return { ...decodedData, role: decodedData?.role?.toLowerCase() };
  } else {
    return null;
  }
};

export const isLoggedIn = () => {
  const userInfo = getUserInfo();
  return userInfo ? userInfo : null;
};

export const removeUser = () => {
  return removeFromLocalStorage(authKey);
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: 'https://finderskeepers-backend.onrender.com/api/refresh-token',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
};
