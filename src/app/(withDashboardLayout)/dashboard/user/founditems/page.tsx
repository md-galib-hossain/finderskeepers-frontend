"use client"
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { getUserInfo } from '@/app/services/auth.services'
import { useGetAllFoundItemsQuery } from '@/redux/api/foundItemApi'
import FoundItemModal from './components/FoundItemModal'
import FoundItemCard from './components/FoundItemCard'
import MyFoundItemModal from '../profile/components/my-founditems/components/MyFoundItemModal'

const LostItems = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const {data:foundItems, isLoading} = useGetAllFoundItemsQuery({})
  const user = getUserInfo()

  return (
    <>
      <Button
        variant="contained"
        size={"large"}
        sx={{
          bgcolor: "#56E39F",
          "&:hover": {
            bgcolor: "#465775",
          },
        }}
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        Upload A Found Item
      </Button>
      <MyFoundItemModal open={isModalOpen} setOpen={setIsModalOpen} />
      <Stack justifyContent="center" alignItems="center" spacing={2} sx={{ width: "100%" }}>
        <Box>
      
          <Typography variant='h6' fontWeight="600" component={"h1"}>Found Items</Typography>
        </Box>
        <Box sx={{ width: "100%", display:"flex", }} >
          <Grid container spacing={{ xs: 2, md: 2 }}>
            {foundItems?.map((item: any, index: any) => (
              <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
                <FoundItemCard foundItem={item} user={user} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </>
  )
}

export default LostItems;
