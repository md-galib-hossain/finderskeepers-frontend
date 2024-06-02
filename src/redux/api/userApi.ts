import { TMeta } from "@/types";
import { tagTypes } from "../tag-Types";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints : (build) => ({
        getSingleUser : build.query({
            query : (id) => ({
                url : `/users/${IdleDeadline}`,
                method : "GET"
            }),
            providesTags : [tagTypes.user]
        }),
        getUsers : build.query({
            query : (params) => ({
                url : `/users`,
                method : "GET",
                params : params
            }),
            transformResponse: (response: any, meta: TMeta) => {
                return {
                  users: response,
                  meta,
                };
              },
            providesTags : [tagTypes.user]
        }),
        updateUserStatus : build.mutation({
            query : ({id,data} ) => {
                return {
                    url : `/users/${id}`,
                    method: "PATCH",
                    data: data,
                }
            },
            invalidatesTags : [tagTypes.user,tagTypes.lostItem,tagTypes.foundItem,tagTypes.userProfile,tagTypes.claim]
        })
     
    })
})

export const {useGetSingleUserQuery,useGetUsersQuery,useUpdateUserStatusMutation} = userApi