import { authKey } from "@/constants/authKey";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import { decodedToken } from "@/utils/jwt";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/local-storage";

export const storeUserInfo = (accessToken:string) => {
  return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authToken : string | any = getFromLocalStorage(authKey);
  
  if (authToken && authToken !== 'undefined') {
    const decodedData: any = decodedToken(authToken);
    return { ...decodedData, role: decodedData?.role?.toLowerCase() };
  }else{
    return ""

  }
};

export const isLoggedIn = () => {
  const authToken: any = getFromLocalStorage(authKey);
  if (authToken) {
    return !!authToken;
  }
};


export const removeUser = () => {
  return removeFromLocalStorage(authKey);
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
     url: 'http://localhost:5000/api/refresh-token',
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     withCredentials: true,
  });
};