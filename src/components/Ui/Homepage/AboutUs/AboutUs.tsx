import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import story from '@/assets/story.svg'
const AboutUs = () => {
  return (

    <Container>
    <Stack alignItems={"center"} direction={"row"} mt={30} mb={20} gap={2}>
      <Box sx={{ marginRight: { xs: 0, md: 4 }, marginBottom: { xs: 4, md: 0 }, flexBasis: { xs: '100%', md: '50%' } }}>
        <Typography variant={"h3"} component="h1" fontWeight={"bold"} marginBottom={2}>Our Story</Typography>
        <Typography>
          At FindersKeepers, our story is one of passion, innovation, and
          empathy. Founded with the belief that every lost item holds immense
          value, we set out to create a platform that goes beyond mere
          functionality. We wanted to build a community—a network of
          individuals dedicated to helping one another in times of need.
        </Typography>
      </Box>
      <Box sx={{ flexBasis: { xs: '100%', md: '50%' }, }}>
        <Image src={story} alt="story" />
      </Box>
    </Stack>
    </Container>
  );
};

export default AboutUs;
