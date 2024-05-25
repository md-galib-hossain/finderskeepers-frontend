import AboutUs from "@/components/Ui/Homepage/AboutUs/AboutUs";
import HappyClients from "@/components/Ui/Homepage/HappyClients/HappyClients";
import HeroSection from "@/components/Ui/Homepage/HeroSection/HeroSection";
import HowItWorks from "@/components/Ui/Homepage/HowItWorks/HowItWorks";
import RecentPost from "@/components/Ui/Homepage/RecentPosts/RecentPost";
import { Box, Button, Stack } from "@mui/material";
import React from "react";

const HomePage = () => {
  return (
    <>
    
<HeroSection/>
<AboutUs/>
<RecentPost/>
<HowItWorks/>
<HappyClients/>
      {/* <Stack gap={2}>
        <Box>
          <Button
            variant="contained"
           size={"large"}
           sx={{
            bgcolor : "#EF6F6C",
            "&:hover": {
                bgcolor: "#465775", 
              },
           }}
          >
            haha
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            sx={{
                bgcolor : "#56E39F",
                "&:hover": {
                    bgcolor: "#465775", 
                  },
               }}
          >
            haha
          </Button>
        </Box>
        <Box>
          {" "}
          <Button variant="outlined"  sx={{
                borderColor : "#465775"
               }}>haha</Button>
        </Box>
      </Stack> */}
    </>
  );
};

export default HomePage;
