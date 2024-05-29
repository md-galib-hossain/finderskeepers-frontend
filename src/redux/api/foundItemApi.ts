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
      invalidatesTags: [tagTypes.foundItem, tagTypes.user],
    }),
    getAllFoundItems: build.query({
      query: (args : Record<string,any>) => ({
        url: "/found-items",
        method: "GET",
        params: args
      }),
      providesTags: [tagTypes.user, tagTypes.foundItem],
    }),

    getMyAllFoundItems: build.query({
      query: () => ({
        url: "/my-founditems",
        method: "GET",
     
      }),
      providesTags: [tagTypes.user, tagTypes.foundItem],
    }),
    softDeleteMyFoundItem: build.mutation({
      query: (id : string) => {
        console.log("Data being sent:", id);
       return {
        url: `/found-items/${id}`,
        method: "DELETE",
       
       
      }},
      invalidatesTags: [tagTypes.foundItem, tagTypes.user],
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
        url: `/my-founditems/${id}`,
        method: "PATCH",
       
       
      }},
      invalidatesTags: [tagTypes.foundItem, tagTypes.user],
    }),
  }),
});

export const { useCreateFoundItemMutation,useMarkAsClaimedMyFoundItemMutation,useUpdateFoundItemMutation,useGetAllFoundItemsQuery,useGetMyAllFoundItemsQuery,useSoftDeleteMyFoundItemMutation } =
foundItemApi;
