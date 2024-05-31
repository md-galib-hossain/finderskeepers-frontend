"use client"
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { getUserInfo } from '@/app/services/auth.services'
import MyLostItemModal from '../profile/components/my-lostitems/components/MyLostItemModal'
import { useGetAllLostItemsQuery } from '@/redux/api/lostItemApi'
import LostItemCard from './components/LostItemCard'

const LostItems = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const {data:lostItems, isLoading} = useGetAllLostItemsQuery({})
  const user = getUserInfo()

  return (
    <>
       <Button
        variant="contained"
        size={"large"}
        sx={{
          bgcolor: "#EF6F6C",
          "&:hover": {
            bgcolor: "#465775",
          },
        }}
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        Upload A Lost Item
      </Button>
      <MyLostItemModal open={isModalOpen} setOpen={setIsModalOpen} />
      <Stack justifyContent="center" alignItems="center" spacing={2} sx={{ width: "100%" }}>
        <Box>
      
          <Typography variant='h6' fontWeight="600" component={"h1"}>Lost Items</Typography>
        </Box>
        <Box sx={{ width: "100%", display:"flex", }} >
          <Grid container spacing={{ xs: 2, md: 2 }}>
            {lostItems?.map((item: any, index: any) => (
              <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
                <LostItemCard lostItem={item} user={user} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </>
  )
}

export default LostItems;
