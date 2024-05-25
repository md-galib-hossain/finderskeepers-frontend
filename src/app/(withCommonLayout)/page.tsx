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
    
    </>
  );
};

export default HomePage;
