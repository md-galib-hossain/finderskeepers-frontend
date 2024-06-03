"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import FKForm from "@/components/Forms/FKForm";
import FKInput from "@/components/Forms/FKInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import logoutUser from "@/app/services/actions/logoutUser";

 const validationSchema = z.object({
  oldPassword: z.string().min(6,"Must be at least 6 characters"),
  newPassword: z.string().min(6, "Must be at least 6 characters"),
  confirmNewPassword: z.string().min(6, "Must be at least 6 characters"),
});

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [changePassword,{isLoading : changingPass}] = useChangePasswordMutation()
  const handleChangePassword = async (values: FieldValues) => {
    if(values.newPassword !== values.confirmNewPassword){
      setError("Confirm password doesn't match")
     
    }
    else if(values.newPassword === values.confirmNewPassword){

      try {
      const {confirmNewPassword,...changePasswordData} = values 
   const result = await changePassword(changePasswordData)
   if(result.data.message){
    toast.success("Password changed")
    logoutUser(router)
   }else{
    setError("Wrong Password!")

   }
      
       } catch (err: any) {
         console.log(err.message);
       }
    }
   
  };
  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          marginTop:4,
          // justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 400,
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
          
            <Box>
              <Typography variant="h6" fontWeight={600} sx={{ marginTop: 2 }}>
                Change Password
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
          <Box>
            <FKForm
              onSubmit={handleChangePassword}
              resolver={zodResolver(validationSchema)}
              defaultValues={{
                oldPassword: "",
                newPassword: "",
                confirmNewPassword: "",
              }}
            >
              {/* parent grid */}
              <Grid container spacing={2} my={1}>
                <Grid sx={{width : "100%"}} item md={12} >
                  <FKInput
                    name="oldPassword"
                    label="Old Password"
                    type="password"
                    fullWidth={true}
                  />
                </Grid>
                <Grid sx={{width : "100%"}} item md={12}>
                  <FKInput
                    name="newPassword"
                    label="New Password"
                    type="password"
                    fullWidth={true}
                  />
                </Grid>
                <Grid sx={{width : "100%"}} item md={12}>
                  <FKInput
                    name="confirmNewPassword"
                    label="Confirm New Password"
                    type="password"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
             
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
                Change Password
              </Button>
             
            </FKForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
