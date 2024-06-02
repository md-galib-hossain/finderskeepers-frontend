import { tagTypes } from "../tag-Types";
import { baseApi } from "./baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCategoryItem: build.mutation({
      query: (data) => ({
        url: "/item-categories",
        method: "POST",
        contentType: "application/json",
        data: data,
      }),
      invalidatesTags: [tagTypes.itemCategory],
    }),
    updateItemCategory: build.mutation({
      query: ({id,data} : any) => {
        console.log("Data being sent:", data);
       return {
        url: `/item-categories/${id}`,
        method: "PATCH",
       
        data: data,
      }},
      invalidatesTags: [tagTypes.lostItem,tagTypes.lostItem, tagTypes.user,tagTypes.itemCategory],
    }),
    getAllCategories: build.query({
      query: () => ({
        url: "/item-categories",
        method: "GET",
      }),
      providesTags: [tagTypes.itemCategory],
    }),
  }),
});

export const { useCreateCategoryItemMutation, useGetAllCategoriesQuery,useUpdateItemCategoryMutation } =
  categoryApi;
