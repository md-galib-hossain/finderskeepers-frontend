import { axiosBaseQuery } from '@/helpers/axios/axiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { tagTypeList } from '../tag-Types'


export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: 'https://finderskeepers-backend.vercel.app/api' }),
  endpoints: () => ({
   
  
  }),
  tagTypes : tagTypeList
})

