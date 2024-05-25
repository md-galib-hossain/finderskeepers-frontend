import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import wave from "./../../../../assets/wave.svg";
import HeroImage from "./HeroImage";
const HeroSection = () => {
  return (<>
  <HeroImage wave={wave}/>
    <Container>
      <Box sx={{ width: "100%", position: "relative", height: "500px" }}>
        {/* hero image */}
       
        <Box
          mt={7}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography sx={{textAlign: "center"}} variant="h3" component="h1" fontWeight={600}>
          Across Overseas Waves and Continents 
          </Typography>
          <Typography sx={{textAlign: "center"}} variant="h3" component="h1" fontWeight={600}>
          We'll Find It for You
          </Typography>

         
          <Typography sx={{ my: 4, textAlign: "center" ,width : "75%"}}>
            At FindersKeepers, we go beyond just a digital platform. We foster a
            community of compassionate individuals who understand the value of
            every lost item and the joy of reuniting it with its owner. Our
            mission is to turn moments of loss into stories of recovery and
            connection.
          </Typography>
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              size={"large"}
              sx={{
                bgcolor: "#56E39F",
                "&:hover": {
                  bgcolor: "#465775",
                },
              }}
            >
              Report A Found Item
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "#EF6F6C",
                borderColor: "#EF6F6C",
                "&:hover": {
                  color: "#465775",
                  borderColor: "#465775",
                },
              }}
            >
              Report A Lost Item
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  </>
  );
};

export default HeroSection;
