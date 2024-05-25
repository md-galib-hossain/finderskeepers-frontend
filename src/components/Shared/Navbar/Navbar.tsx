"use client";
import { Box, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
const Navbar = () => {
  // lazy loading
  const AuthButton = dynamic(() => import('@/components/Ui/AuthButton/AuthButton'), { ssr: false })

  return (
    <Container >
      <Stack
     
        py={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" color="#465775" fontWeight={600} component={Link} href="/">
          Finders
          <Box component="span" color="#56E39F">
            Keepers
          </Box>
        </Typography>
        <Stack direction="row" gap={4} justifyContent="space-between">
          <Typography component={Link} href="/consultation">
          Home
          </Typography>
          <Typography component={Link} href="/healthplans">
My profile          </Typography>
          <Typography component={Link} href="/medicine">
          My Profile
          </Typography>
          <Typography component={Link} href="/diagnostics">
            Posts
          </Typography>
          <Typography component={Link} href="/ngos">
            About us
          </Typography>
        </Stack>
        <AuthButton/>
      </Stack>
    </Container>
  );
};

export default Navbar;
