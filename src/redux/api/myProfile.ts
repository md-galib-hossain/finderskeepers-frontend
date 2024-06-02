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
                    method: "PATCH",
                    data: data,
                }
            },
            invalidatesTags : [tagTypes.user,tagTypes.lostItem,tagTypes.foundItem,tagTypes.userProfile,tagTypes.claim]
        })
    })

})

export const {useGetMyProfileQuery,useUpdateMyProfileMutation} = profileApi