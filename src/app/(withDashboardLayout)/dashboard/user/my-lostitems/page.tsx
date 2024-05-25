"use client"
import { useGetAllLostItemsQuery } from '@/redux/api/userApi'
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import MyLostItemCard from './components/MyLostItemCard'

const UserLostItems = () => {
  const {data : lostItems,isLoading} = useGetAllLostItemsQuery({})
  return (
    <>lost item page
    <Stack justifyContent={"center"}>
<Box>
  {
    isLoading ? null : lostItems?.length
  }
<Typography variant='h6' fontWeight="600" component={"h1"}>My Lost Items</Typography>
</Box>
<Box>
{
  lostItems?.map((item : any)=> {

    return <MyLostItemCard/>
  })
}
</Box>

    </Stack>
    
    
    </>
  )
}

export default UserLostItems