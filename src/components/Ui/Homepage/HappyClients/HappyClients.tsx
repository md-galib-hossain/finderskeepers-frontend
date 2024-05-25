import React from 'react'
import RecentPostCard from './HappyClientsCard'
import { Box, Button, Container, Stack, Typography } from '@mui/material'

const HappyClients = () => {
  return (
    <Container>
        <Box mt={25} mb={10} display={"flex"} flexDirection={"column"} gap={4} alignItems={"center"}>
        <Typography sx={{textAlign : "center"}} component="h1" variant="h3" fontWeight={"bold"} marginBottom={5}>

        Happy Clients
        </Typography>
        <Stack direction={"row"} gap={4}>

<RecentPostCard />
<RecentPostCard />
<RecentPostCard/>

        </Stack>

      <Box>
      <Button 
              variant="outlined"
            
              sx={{
             width : "200px",
             
             color: "#465775",
             borderColor: "#465775",
                "&:hover": {
                  color: "#465775",
                  borderColor: "#56E39F",
                },
              }}
            >
              See all
            </Button>
      </Box>
        </Box>
    </Container>
  )
}

export default HappyClients