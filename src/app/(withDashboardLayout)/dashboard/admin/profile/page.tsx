"use client"
import { useGetMyProfileQuery } from '@/redux/api/myProfile';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react'
import EditProfileModal from '../../user/profile/components/EditProfileModal';

const AdminProfilePage = () => {
    const { data: user, isLoading } = useGetMyProfileQuery({});
    const [open, setOpen] = useState(false);

  return (
    <>
{!isLoading && user && (
        <Box mb={6}>
          <Box display={"flex"} alignItems={"center"}>
            <Box>
              <Box height={150} width={150}>
                <Avatar
                  alt="profile photo"
                  src={user?.profilePhoto}
                  sx={{ width: "100%", height: "100%" }}
                />
              </Box>
              <Typography fontWeight={"600"} textAlign={"center"} marginTop={2}>
                @{user?.userName}
              </Typography>
            </Box>
            <Grid container sx={{ marginLeft: 5 }} rowSpacing={3}>
              <Grid item xs={12} sm={12} md={3} lg={3}>
                <Typography variant="body2" color="text.secondary">
                  <Box display="flex" alignItems="center">
                    <Typography fontWeight={600}>Name:&nbsp;</Typography>
                    <Typography>{user?.name}</Typography>
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Typography variant="body2" color="text.secondary">
                  <Box display="flex" alignItems="center">
                    <Typography fontWeight={600}>Email:&nbsp;</Typography>
                    <Typography>{user?.email}</Typography>
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Typography variant="body2" color="text.secondary">
                  <Box display="flex" alignItems="center">
                    <Typography fontWeight={600}>Bio:&nbsp;</Typography>
                    <Typography>{user?.profile?.bio}</Typography>
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Typography variant="body2" color="text.secondary">
                  <Box display="flex" alignItems="center">
                    <Typography fontWeight={600}>Age:&nbsp;</Typography>
                    <Typography>{user?.profile?.age}</Typography>
                  </Box>
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box mt={2} display={"flex"} justifyContent={"end"}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
              sx={{
                bgcolor: "#56E39F",
                "&:hover": {
                  bgcolor: "#56E39F",
                },
              }}
            >
              Edit Profile
            </Button>
          </Box>
        </Box>
      )}


<EditProfileModal open={open} setOpen={setOpen} user={user} />

    </>
  )
}

export default AdminProfilePage