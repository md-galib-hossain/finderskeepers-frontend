import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import facebookIcon from "@/assets/landing_page/facebook.png";
import twitterIcon from "@/assets/landing_page/twitter.png";
import instagramIcon from "@/assets/landing_page/instagram.png";
import linkedinIcon from "@/assets/landing_page/linkedin.png";

const Footer = () => {
  return (
    <Box bgcolor="#465775" py={5}>
      <Container>
        <Stack direction="row" gap={4} justifyContent="center">
          <Typography color="#fff" component={Link} href="/about-us">
            About Us
          </Typography>
          <Typography color="#fff" component={Link} href="/contact-us">
            Contact Us
          </Typography>
          <Typography color="#fff" component={Link} href="/how-it-works">
            How It Works
          </Typography>
        
        
          <Typography color="#fff" component={Link} href="/terms-of-use">
            Terms of Use
          </Typography>
          <Typography color="#fff" component={Link} href="/privacy-policy">
            Privacy Policy
          </Typography>
          <Typography color="#fff" component={Link} href="/faqs">
            FAQs
          </Typography>
          <Typography color="#fff" component={Link} href="/success-stories">
            Success Stories
          </Typography>
        
        
         
        </Stack>
        <Stack direction="row" gap={2} justifyContent="center" py={3}>
          <Link href="https://www.facebook.com/yourpage">
            <Image src={facebookIcon} width={30} height={30} alt="facebook" />
          </Link>
          <Link href="https://www.twitter.com/yourpage">
            <Image src={twitterIcon} width={30} height={30} alt="twitter" />
          </Link>
          <Link href="https://www.instagram.com/yourpage">
            <Image src={instagramIcon} width={30} height={30} alt="instagram" />
          </Link>
          <Link href="https://www.linkedin.com/yourpage">
            <Image src={linkedinIcon} width={30} height={30} alt="linkedin" />
          </Link>
        </Stack>
        <Stack
          direction="row"
          gap={2}
          justifyContent="space-between"
          alignItems="center"
          py={3}
        >
          <Typography color="#fff" component="p">
            &copy;2024 Finders Keepers
. All Rights Reserved.
          </Typography>
          <Typography variant="h4" color="white" fontWeight={600} component={Link} href="/">
          Finders
          <Box component="span" color="#56E39F">
            Keepers
          </Box>
        </Typography>
          
          <Typography color="#fff" component="p">
            Privacy Policy | Terms & Conditions
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
