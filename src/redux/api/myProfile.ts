import { tagTypes } from "../tag-Types";
import { baseApi } from "./baseApi";
import { userApi } from "./userApi";

const profileApi = baseApi.injectEndpoints({

    endpoints : (build) =>({
        getMyProfile : build.query({
            query : ()=>{
                return {
                    url : '/my-profile',
                    method : 'GET'
                }
            },
            providesTags : [tagTypes.user]
        }),
        updateMyProfile : build.mutation({
            query : (data) => {
                return {
                    url : '/my-profile',
                    method : 'PATCH',
                    data,
                    contentType : 'multipart/form-data'
                }
            },
            invalidatesTags : [tagTypes.user]
        })
    })

})

export const {useGetMyProfileQuery,useUpdateMyProfileMutation} = profileApi