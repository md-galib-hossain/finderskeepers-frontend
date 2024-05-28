import { tagTypes } from "../tag-Types";
import { baseApi } from "./baseApi";

export const foundItemApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createFoundItem: build.mutation({
      query: (data) => {
        console.log("Data being sent:", data);
       return {
        url: "/found-items",
        method: "POST",
       
        data: data,
      }},
      invalidatesTags: [tagTypes.lostItem, tagTypes.user],
    }),
    getAllFoundItems: build.query({
      query: () => ({
        url: "/my-founditems",
        method: "GET",
      }),
      providesTags: [tagTypes.user, tagTypes.lostItem],
    }),
    softDeleteMyFoundItem: build.mutation({
      query: (id : string) => {
        console.log("Data being sent:", id);
       return {
        url: `/found-items/${id}`,
        method: "DELETE",
       
       
      }},
      invalidatesTags: [tagTypes.lostItem, tagTypes.user],
    }),
    updateFoundItem: build.mutation({
      query: (data) => {
        console.log("Data being sent:", data);
       return {
        url: "/found-items",
        method: "PATCH",
       
        data: data,
      }},
      invalidatesTags: [tagTypes.user,tagTypes.foundItem],
    }),
    markAsClaimedMyFoundItem: build.mutation({
      query: (id : string) => {
        console.log("Data being sent:", id);
       return {
        url: `/found-items/${id}`,
        method: "PATCH",
       
       
      }},
      invalidatesTags: [tagTypes.lostItem, tagTypes.user],
    }),
  }),
});

export const { useCreateFoundItemMutation,useMarkAsClaimedMyFoundItemMutation,useUpdateFoundItemMutation, useGetAllFoundItemsQuery,useSoftDeleteMyFoundItemMutation } =
foundItemApi;
