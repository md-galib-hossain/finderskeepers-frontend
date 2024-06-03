import { axiosBaseQuery } from '@/helpers/axios/axiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { tagTypeList } from '../tag-Types'


export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: 'https://finderskeepers-backend.onrender.com/api' }),
  endpoints: () => ({
   
  
  }),
  tagTypes : tagTypeList
})

