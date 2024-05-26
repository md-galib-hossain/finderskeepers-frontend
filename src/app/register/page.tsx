"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useForm, SubmitHandler, FieldValues, FormProvider } from "react-hook-form";
import {  registerUser } from "../services/actions/registerUser";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userLogin } from "../services/actions/userLogin";
import { storeUserInfo } from "../services/auth.services";
import FKForm from "@/components/Forms/FKForm";
import FKInput from "@/components/Forms/FKInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const patientValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z.string({
    required_error: "Email is required",
  }).email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Must be at least 6 characters"),
  profile: z.object({
    bio: z.string({ required_error: "Bio is required" }),
    age: z.string({ required_error: "Age is required" }),
  }),
});

const formDefaultValues = {
  name: "",
  password: "",
  email: "",
  profile: {
    bio: "",
    age: "0", // Default age as string
  },
};

const RegisterPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const methods = useForm({
    resolver: zodResolver(patientValidationSchema),
    defaultValues: formDefaultValues,
  });

  const handleRegister: SubmitHandler<FieldValues> = async (values) => {
    try {
      // Convert age to number
      const payload = {
        ...values,
        profile: {
          ...values.profile,
          age: Number(values.profile.age),
        },
      };

      const response = await registerUser(payload);
      if (response?.data?.id) {
        toast.success(response?.message);

        // Login after registration
        const result = await userLogin({
          password: values.password,
          email: values.email,
        });
        console.log(result)
        if (result?.data?.accessToken) {
          toast.success(result?.message);
          storeUserInfo(result?.data?.accessToken);
          router.push("/dashboard");
        }
      } else {
        setError(`User with the same email already exists`);
      }
    } catch (err: any) {
      console.log(err?.message);
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
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                Register
              </Typography>
            </Box>
          </Stack>
          {/* Error message start */}
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
          {/* Error message end */}
          {/* Input fields parent box */}
          <Box>
            <FormProvider {...methods}>
              <FKForm onSubmit={handleRegister}>
                {/* Parent grid */}
                <Grid container spacing={2} my={1}>
                  <Grid item md={12}>
                    <FKInput name="name" label="Name" fullWidth={true} />
                  </Grid>
                  <Grid item md={6}>
                    <FKInput
                      label="Email"
                      type="email"
                      fullWidth={true}
                      name="email"
                    />
                  </Grid>
                  <Grid item md={6}>
                    <FKInput
                      label="Password"
                      type="password"
                      fullWidth={true}
                      name="password"
                    />
                  </Grid>
                  <Grid item md={6}>
                    <FKInput
                      label="Bio"
                      type="text"
                      fullWidth={true}
                      name="profile.bio"
                    />
                  </Grid>
                  <Grid item md={6}>
                    <FKInput
                      label="Age"
                      type="number"
                      fullWidth={true}
                      name="profile.age"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  sx={{
                    margin: "8px 0px",
                    bgcolor: "#56E39F",
                    "&:hover": {
                      bgcolor: "#465775",
                    },
                  }}
                  fullWidth={true}
                >
                  Register
                </Button>
                <Typography component="p" fontWeight={300}>
                  Do you already have an account?{" "}
                  <Box component="span" color="#56E39F">
                    <Link href="/login">Login</Link>
                  </Box>
                </Typography>
              </FKForm>
            </FormProvider>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
