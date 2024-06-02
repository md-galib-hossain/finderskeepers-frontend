import { tagTypes } from '../tag-Types';
import { baseApi } from './baseApi';
const AUTH_URL = '/auth';

export const authApi = baseApi.injectEndpoints({
   endpoints: (build) => ({
      userLogin: build.mutation({
         query: (loginData ) => ({
            url: `/login`,
            method: 'POST',
            headers: {
               "Content-Type": "application/json",
             },
            data: loginData,
            credentials : "include"

         }),
         invalidatesTags: [tagTypes.user],
      }),
      changePassword: build.mutation({
         query: (data) => ({
            url: "/change-password",
            method: 'POST',
            contentType: 'application/json',
            data: data,
         }),
         invalidatesTags: [tagTypes.user],
      }),
      forgotPassword: build.mutation({
         query: (data) => ({
            url: `${AUTH_URL}/forgot-password`,
            method: 'POST',
            
            data: data,
         }),
         invalidatesTags: [tagTypes.user],
      }),
      resetPassword: build.mutation({
         query: (data) => ({
            url: `${AUTH_URL}/reset-password`,
            method: 'POST',
            data: data,
         }),
         invalidatesTags: [tagTypes.user],
      }),
   }),
});

export const {
   useUserLoginMutation,
   useChangePasswordMutation,
   useForgotPasswordMutation,
   useResetPasswordMutation,
} = authApi;