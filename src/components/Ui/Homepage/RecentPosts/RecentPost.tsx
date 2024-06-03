"use client";
import React from "react";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useGetAllLostItemsQuery } from "@/redux/api/lostItemApi";
import RecentPostCard from "./RecentPostCard";
import { getUserFromLocalStorage } from "@/utils/local-storage";
import Link from "next/link";

const RecentPost = () => {
  const { data, isLoading } = useGetAllLostItemsQuery({});
  console.log({data})
  const lostItems = data?.lostItems
  const user = getUserFromLocalStorage();

  return (
    <Container>
      <Box mt={10} display={"flex"} flexDirection={"column"} gap={4} alignItems={"center"}>
        <Typography component="h1" variant="h3" fontWeight={"bold"} marginBottom={5} textAlign="center">
          Recent Posts
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {!isLoading &&
            lostItems?.map((item: any, index: any) => (
              <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
                <RecentPostCard lostItem={item} user={user} />
              </Grid>
            ))}
        </Grid>
        <Box mt={4}>
          <Link href="/dashboard/user/lostitems">
          <Button
            variant="outlined"
            sx={{
              width: "200px",
              color: "#465775",
              borderColor: "#465775",
              "&:hover": {
                color: "#465775",
                borderColor: "#56E39F",
              },
            }}
          >
            See all
          </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default RecentPost;
