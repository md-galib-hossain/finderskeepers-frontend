import React from 'react';
import { Container, Typography, Box, Grid, Paper, Avatar, Stack } from '@mui/material';
import facebookIcon from "@/assets/landing_page/facebook.png";
import twitterIcon from "@/assets/landing_page/twitter.png";
import instagramIcon from "@/assets/landing_page/instagram.png";
import linkedinIcon from "@/assets/landing_page/linkedin.png";
import bannernew from '@/assets/banner2.png';
import Image from 'next/image';
import Link from 'next/link';
import ceo from '@/assets/IMG_20240228_115959.jpg'
import cto from '@/assets/client1.jpg'
import manager from '@/assets/client2.jpg'
// Example team members data
const teamMembers = [
  { name: 'Md Galib Hossain', role: 'Founder & CEO', img: ceo.src },
  { name: 'Bob Smith', role: 'CTO', img: cto.src },
  { name: 'Carol White', role: 'Community Manager', img: manager.src },
];

const testimonials = [
  {
    name: 'Jane Doe',
    message: 'Thanks to FindersKeepers, I was able to find my lost wallet within a day. Amazing platform!',
  },
  {
    name: 'John Smith',
    message: 'I found a lost pet and the process of reporting and reuniting was seamless. Highly recommended!',
  },
];

const AboutUs = () => {
  return (
    <Container>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${bannernew.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          py: 10,
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" component="h1" fontWeight="bold">
          About Us
        </Typography>
        <Typography variant="h5" mt={2}>
          Our Vision, Mission, and Team
        </Typography>
      </Box>

     {/* Our Vision Section */}
     <Box mt={8} textAlign="center">
        <Typography variant="h4" component="h2" fontWeight="bold">
          Our Vision
        </Typography>
        <Typography variant="body1" mt={2} sx={{ maxWidth: 600, mx: 'auto' }}>
          Our vision is to create a world where lost items are reunited with their owners seamlessly and efficiently. We aspire to build a community where people come together to help each other in times of need, making the process of finding lost belongings as quick and stress-free as possible.
        </Typography>
      </Box>

      {/* Mission Section */}
      <Box mt={8} textAlign="center">
        <Typography variant="h4" component="h2" fontWeight="bold">
          Our Mission
        </Typography>
        <Typography variant="body1" mt={2} sx={{ maxWidth: 600, mx: 'auto' }}>
          Our mission is to facilitate the reporting and recovery of lost items through a community-driven platform. We strive to create a seamless process for reuniting people with their belongings and to foster a supportive network for individuals in times of need.
        </Typography>
      </Box>

      {/* Team Section */}
      <Box mt={8} textAlign="center">
        <Typography variant="h4" component="h2" fontWeight="bold">
          Meet Our Team
        </Typography>
        <Grid container spacing={4} mt={2} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Avatar src={member.img} alt={member.name} sx={{ width: 100, height: 100, mx: 'auto' }} />
                <Typography variant="h6" mt={2} fontWeight="bold">
                  {member.name}
                </Typography>
                <Typography variant="body1">{member.role}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Testimonials Section */}
      <Box mt={8} mb={8} textAlign="center">
        <Typography variant="h4" component="h2" fontWeight="bold">
          Testimonials
        </Typography>
        <Grid container spacing={4} mt={2} justifyContent="center">
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper sx={{ p: 4 }}>
                <Typography variant="body1" fontStyle="italic">
                  "{testimonial.message}"
                </Typography>
                <Typography variant="h6" mt={2} fontWeight="bold">
                  - {testimonial.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

 
    </Container>
  );
};

export default AboutUs;
