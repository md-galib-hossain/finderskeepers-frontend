"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { userLogin } from "../services/actions/userLogin";
import { toast } from "sonner";
import { getUserInfo, storeUserInfo } from "../services/auth.services";
import FKForm from "@/components/Forms/FKForm";
import FKInput from "@/components/Forms/FKInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserLoginMutation } from "@/redux/api/authApi";
import setAccessToken from "../services/actions/setAccessToken";

export const validationSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [userLogin, { isLoading: logging }] = useUserLoginMutation();
  const handleLogin = async (values: FieldValues) => {
    try {
      const res = await userLogin(values);
      if (res?.data?.accessToken) {
        toast.success("Logged in");
        storeUserInfo(res?.data?.accessToken);
        const user = getUserInfo();

        setAccessToken(res?.data?.accessToken, { redirect: "/dashboard" });

        // router.push(`/dashboard/${user?.role}`);
      } else {
        setError("Failed to login");
        // toast.error(res?.message);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };
  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          {/* icon and title */}
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
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
            <Box>
              <Typography variant="h6" fontWeight={600} sx={{ marginTop: 2 }}>
                Login
              </Typography>
            </Box>
          </Stack>
          {/* error message start */}
          {error && (
            <Box>
              <Typography
                sx={{
                  backgroundColor: "red",
                  padding: "1px",
                  borderRadius: "2px",
                  color: "white",
                  marginTop: "5px",
                }}
              >
                {error}
              </Typography>
            </Box>
          )}

          {/* error message end */}

          {/* */}
          <Box>
            <FKForm
              onSubmit={handleLogin}
              resolver={zodResolver(validationSchema)}
              defaultValues={{
                email: "",
                password: "",
              }}
            >
              {/* parent grid */}
              <Grid container spacing={2} my={1}>
                <Grid item md={6}>
                  <FKInput
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <FKInput
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
              <Typography mb={1} textAlign="end" component="p" fontWeight={300}>
                <Link href="/forgot-password">Forgot password?</Link>
              </Typography>
              <Button
                sx={{
                  margin: "8px 0px",
                  bgcolor: "#56E39F",
                  "&:hover": {
                    bgcolor: "#465775",
                  },
                }}
                fullWidth={true}
                type="submit"
              >
                Login
              </Button>
              <Typography component="p" fontWeight={300}>
                Don't have an account?{" "}
                <Box component="span" color="#56E39F">
                  <Link href="/register">Register</Link>
                </Box>
              </Typography>
            </FKForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
