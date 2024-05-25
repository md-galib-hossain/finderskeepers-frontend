import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import howitworks from "@/assets/howitworks.png";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
const HowItWorks = () => {
  return (
    <Container>
      <Box
        mt={25}
        display={"flex"}
        flexDirection={"column"}
        gap={4}
        alignItems={"center"}
      >
        <Typography
          sx={{ textAlign: "center" }}
          component="h1"
          variant="h3"
          fontWeight={"bold"}
          marginBottom={2}
        >
          How It Works
        </Typography>
        <Box display={"flex"} alignItems={"center"}>
          <Box>
            <Image width={700} height={700} src={howitworks} alt="" />
          </Box>
          <Stack gap={2}>
            <Typography
              component="h1"
              variant="h5"
              fontWeight={"bold"}
              marginBottom={2}
            >
              Discover the easy and efficient way to reunite belongings
            </Typography>
            <Box display={"flex"}>
              <ChevronRightIcon />
              <Typography component="h6"
              // variant="h6"
              fontWeight={"600"} sx={{marginLeft : "10px"}}>Report a lost or found item</Typography>
            </Box>
            <Box display={"flex"}>
              <ChevronRightIcon />
              <Typography sx={{marginLeft : "10px"}} component="h6"
              // variant="h6"
              fontWeight={"600"}>Verify ownership & Claim</Typography>
            </Box>
            <Box display={"flex"}>
              <ChevronRightIcon />
              <Typography sx={{marginLeft : "10px"}} component="h6"
              // variant="h6"
              fontWeight={"600"}>Reunite with your belongings</Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default HowItWorks;
