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
    getAllCategories: build.query({
      query: () => ({
        url: "/item-categories",
        method: "GET",
      }),
      providesTags: [tagTypes.itemCategory],
    }),
  }),
});

export const { useCreateCategoryItemMutation, useGetAllCategoriesQuery } =
  categoryApi;
