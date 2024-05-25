import { tagTypes } from "../tag-Types";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints : (build) => ({
        getSingleUser : build.query({
            query : () => ({
                url : "/my-profile",
                method : "GET"
            }),
            providesTags : [tagTypes.user]
        }),
        getAllLostItems : build.query({
            query : () => ({
                url : "/my-lostitems",
                method : "GET"
            }),
            providesTags : [tagTypes.user,tagTypes.lostItem]
        }),
    })
})

export const {useGetSingleUserQuery,useGetAllLostItemsQuery} = userApi