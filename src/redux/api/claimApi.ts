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
    getAllClaimItems: build.query({
      query: () => ({
        url: "/claims",
        method: "GET",
      }),
      providesTags: [tagTypes.user, tagTypes.lostItem,tagTypes.foundItem],
    }),
    getMyClaims: build.query({
      query: () => ({
        url: "/my-claims",
        method: "GET",
      }),
      providesTags: [tagTypes.user, tagTypes.lostItem,tagTypes.foundItem],
    })
  }),
});

export const { useClaimItemMutation, useGetAllClaimItemsQuery,useGetMyClaimsQuery,useUpdateClaimItemMutation } =
claimItemApi;
