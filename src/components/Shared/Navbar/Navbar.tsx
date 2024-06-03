"use client";
import { getUserInfo } from "@/app/services/auth.services";
import { getUserFromLocalStorage } from "@/utils/local-storage";
import { Box, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
const Navbar =() => {
  // lazy loading
  const AuthButton = dynamic(() => import('@/components/Ui/AuthButton/AuthButton'), { ssr: false })
  const [user, setUser] = useState<{ role?: string } | null>(null);

  useEffect(() => {
    const userFromStorage = getUserInfo();
    setUser(userFromStorage);
  }, []);


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
         {
          user ?  <Typography component={Link} href={`dashboard/${user?.role}`}>
          My Profile
        </Typography> : null
         }
          
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
