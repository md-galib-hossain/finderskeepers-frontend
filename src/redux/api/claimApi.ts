import { tagTypes } from "../tag-Types";
import { baseApi } from "./baseApi";

export const claimItemApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    claimItem: build.mutation({
      query: (data) => {
        console.log("Data being sent:", data);
       return {
        url: "/claims",
        method: "POST",
       
        data: data,
      }},
      invalidatesTags: [tagTypes.claim, tagTypes.user,tagTypes.foundItem],
    }),
    updateClaimItem: build.mutation({
      query: (data) => {
        console.log("Data being sent:", data);
       return {
        url: "/claims",
        method: "PATCH",
       
        data: data,
      }},
      invalidatesTags: [tagTypes.claim, tagTypes.user,tagTypes.foundItem],
    }),
    approveClaimItem: build.mutation({
      query: (id) => {
        console.log("Data being sent:", id);
       return {
        url: `/claims/approveclaim/${id}`,
        method: "PATCH",
       
        
      }},
      invalidatesTags: [tagTypes.claim, tagTypes.user,tagTypes.foundItem,tagTypes.lostItem],
    }),
    rejectClaimItem: build.mutation({
      query: (id) => {
        console.log("Data being sent:", id);
       return {
        url: `/claims/rejectclaim/${id}`,
        method: "PATCH",
       
        
      }},
      invalidatesTags: [tagTypes.claim, tagTypes.user,tagTypes.foundItem,tagTypes.lostItem],
    }),
    updateMyClaimItem: build.mutation({
      query: (data) => {
        console.log("Data being sent:", data);
       return {
        url: "/myfoundeditems-claims",
        method: "PATCH",
       
        data: data,
      }},
      invalidatesTags: [tagTypes.claim, tagTypes.user,tagTypes.foundItem],
    }),
    getAllClaimItems: build.query({
      query: () => ({
        url: "/claims",
        method: "GET",
      }),
      providesTags: [tagTypes.user, tagTypes.lostItem,tagTypes.foundItem,tagTypes.claim],
    }),
    getMyClaims: build.query({
      query: () => ({
        url: "/my-claims",
        method: "GET",
      }),
      providesTags: [tagTypes.user, tagTypes.lostItem,tagTypes.foundItem,tagTypes.claim],
    }),
    getAllClaimsForMyFoundedItems: build.query({
      query: () => ({
        url: "/myfoundeditems-claims",
        method: "GET",
      }),
      providesTags: [tagTypes.user, tagTypes.lostItem,tagTypes.foundItem],
    }),
    
  }),
});

export const { useRejectClaimItemMutation,useApproveClaimItemMutation,useGetAllClaimsForMyFoundedItemsQuery,useClaimItemMutation,useUpdateMyClaimItemMutation, useGetAllClaimItemsQuery,useGetMyClaimsQuery,useUpdateClaimItemMutation } =
claimItemApi;
