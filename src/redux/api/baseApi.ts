import { axiosBaseQuery } from '@/helpers/axios/axiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { tagTypeList } from '../tag-Types'


export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: 'https://finderskeepers-backend-qu6mz8f8g-mdgalibhossain1s-projects.vercel.app/api' }),
  endpoints: () => ({
   
  
  }),
  tagTypes : tagTypeList
})

