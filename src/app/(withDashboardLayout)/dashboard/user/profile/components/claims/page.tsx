"use client";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {  useGetAllClaimsForMyFoundedItemsQuery, useGetMyClaimsQuery } from "@/redux/api/claimApi";
import MyClaimItemCard from "./components/MyClaimItemCard";
import ClaimsOnMyItemCard from "./components/ClaimsOnMyItemCard";

const UserClaims = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: claims, isLoading } = useGetMyClaimsQuery({});
  const {data : othersClaim,isLoading : loading} = useGetAllClaimsForMyFoundedItemsQuery({})
  const [view, setView] = useState("Items I've Claimed");
  const renderView = () => {
    switch (view) {
      case "Items I've Claimed":
        return <Grid container spacing={{ xs: 2, md: 2 }}>
        {claims?.map((item: any, index: any) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
            <MyClaimItemCard claimItem={item} />
          </Grid>
        ))}
      </Grid>;
      case "Claims On my items":
        return <Grid container spacing={{ xs: 2, md: 2 }}>
        {othersClaim?.map((item: any, index: any) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
            <ClaimsOnMyItemCard claimItem={item} />
          </Grid>
        ))}
      </Grid>;
      default:
        return <Grid container spacing={{ xs: 2, md: 2 }}>
        {claims?.map((item: any, index: any) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
            <MyClaimItemCard claimItem={item} />
          </Grid>
        ))}
      </Grid>;
    }
  };

  if (!loading) {
    console.log(othersClaim);
  }
  return (
    <>
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ width: "100%" }}
      >
        <Box>
          <Typography variant="h6" fontWeight="600" component={"h1"}>
            My Claim Items
          </Typography>
        </Box>
        <Box>
          <ButtonGroup
            sx={{ marginBottom: 4 }}
            variant="outlined"
            aria-label="Basic button group"
          >
            <Button
              sx={{
                bgcolor:
                  view === "Items I've Claimed" ? "#465775" : "transparent",
                color: view === "Items I've Claimed" ? "#fff" : "#465775",
                borderColor: "#465775",
                "&:hover": {
                  bgcolor:
                    view === "Items I've Claimed" ? "#3b4a63" : "transparent",
                  borderColor: "#465775",
                },
              }}
              onClick={() => setView("Items I've Claimed")}
              variant={view === "Items I've Claimed" ? "contained" : "outlined"}
            >
              Items I've Claimed
            </Button>
            <Button
              sx={{
                bgcolor:
                  view === "Claims On my items" ? "#465775" : "transparent",
                color: view === "Claims On my items" ? "#fff" : "#465775",
                borderColor: "#465775",
                "&:hover": {
                  bgcolor:
                    view === "Claims On my items" ? "#3b4a63" : "transparent",
                  borderColor: "#465775",
                },
              }}
              onClick={() => setView("Claims On my items")}
              variant={view === "Claims On my items" ? "contained" : "outlined"}
            >
              Claims On my items
            </Button>
          </ButtonGroup>
        </Box>
        <Box sx={{ width: "100%", display: "flex" }}>
          {renderView()}
        </Box>
      </Stack>
    </>
  );
};

export default UserClaims;
