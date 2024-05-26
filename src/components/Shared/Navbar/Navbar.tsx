"use client";
import { Box, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
const Navbar = () => {
  // lazy loading
  const AuthButton = dynamic(() => import('@/components/Ui/AuthButton/AuthButton'), { ssr: false })


  return (
    <Box sx={{ position: "relative", zIndex: 10 }}>  {/* Added zIndex */}

    <Container>
      <Stack
      
        py={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="h4"
          color="#465775"
          fontWeight={600}
          component={Link}
          href="/"
        >
          Finders
          <Box component="span" color="#56E39F">
            Keepers
          </Box>
        </Typography>
        <Stack direction="row" gap={4} justifyContent="space-between">
          <Typography component={Link} href="/">
            Home{" "}
          </Typography>
          <Typography component={Link} href="dashboard/">
            My Profile
          </Typography>
          <Typography component={Link} href="/posts">
            Posts
          </Typography>
          <Typography component={Link} href="/about-us">
            About us
          </Typography>
        </Stack>
        <AuthButton />
      </Stack>
    </Container>
    </Box>
  );
};

export default Navbar;
