import { tagTypes } from "../tag-Types";
import { baseApi } from "./baseApi";

export const lostItemApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createLostItem: build.mutation({
      query: (data) => {
        console.log("Data being sent:", data);
       return {
        url: "/lost-items",
        method: "POST",
       
        data: data,
      }},
      invalidatesTags: [tagTypes.lostItem, tagTypes.user],
    }),
    getAllLostItems: build.query({
      query: () => ({
        url: "/my-lostitems",
        method: "GET",
      }),
      providesTags: [tagTypes.user, tagTypes.lostItem],
    }),
    softDeleteMyLostItem: build.mutation({
      query: (id : string) => {
        console.log("Data being sent:", id);
       return {
        url: `/lost-items/${id}`,
        method: "DELETE",
       
       
      }},
      invalidatesTags: [tagTypes.lostItem, tagTypes.user],
    }),
    markAsFoundMyLostItem: build.mutation({
      query: (id : string) => {
        console.log("Data being sent:", id);
       return {
        url: `/lost-items/${id}`,
        method: "PATCH",
       
       
      }},
      invalidatesTags: [tagTypes.lostItem, tagTypes.user],
    }),
  }),
});

export const { useCreateLostItemMutation,useMarkAsFoundMyLostItemMutation, useGetAllLostItemsQuery,useSoftDeleteMyLostItemMutation } =
  lostItemApi;
