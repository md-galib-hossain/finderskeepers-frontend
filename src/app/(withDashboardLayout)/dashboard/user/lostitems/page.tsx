"use client";
import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { getUserInfo } from "@/app/services/auth.services";
import MyLostItemModal from "../profile/components/my-lostitems/components/MyLostItemModal";
import { useGetAllLostItemsQuery } from "@/redux/api/lostItemApi";
import LostItemCard from "./components/LostItemCard";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";

const LostItems = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 10,
    location: "",
    category: "",
    searchTerm: "",
  });

  const user = getUserInfo();

  // Dynamically construct query parameters to exclude empty properties
  const constructQueryParams = () => {
    const params: { [key: string]: any } = {};
    if (queryParams.page) params.page = queryParams.page;
    if (queryParams.limit) params.limit = queryParams.limit;
    if (queryParams.location) params.location = queryParams.location;
    if (queryParams.category) params.category = queryParams.category;
    if (queryParams.searchTerm) params.searchTerm = queryParams.searchTerm;
    return params;
  };

  const { data: categories, isLoading: loadingCategories } =
    useGetAllCategoriesQuery({});
  const { data, isLoading } = useGetAllLostItemsQuery(constructQueryParams());
  const lostItems = data?.lostItems;

  // Extract unique locations
  let uniqueLocations: string[] = [];
  if (lostItems) {
    const locationSet = new Set<string>();
    for (const item of lostItems) {
      locationSet.add(item.location);
    }
    uniqueLocations = Array.from(locationSet);
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setQueryParams((prev) => ({ ...prev, page: value }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryParams((prev) => ({ ...prev, searchTerm: event.target.value }));
  };

  const handleLocationChange = (event: any) => {
    setQueryParams((prev) => ({ ...prev, location: event.target.value }));
  };

  const handleCategoryChange = (event: any) => {
    setQueryParams((prev) => ({ ...prev, category: event.target.value }));
  };

  console.log(queryParams);
  return (
    <>
      <Button
        variant="contained"
        size="large"
        sx={{
          bgcolor: "#EF6F6C",
          "&:hover": {
            bgcolor: "#465775",
          },
        }}
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        Upload A Lost Item
      </Button>
      <MyLostItemModal open={isModalOpen} setOpen={setIsModalOpen} />

      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ width: "100%" }}
      >
        <Box>
          <Typography variant="h6" fontWeight="600" component="h1">
            Lost Items
          </Typography>
        </Box>

        {/* Filters and Search */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            label="Search"
            variant="outlined"
            value={queryParams.searchTerm}
            onChange={handleSearchChange}
          />
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel>Location</InputLabel>
            <Select
              value={queryParams.location}
              onChange={handleLocationChange}
              label="Location"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {uniqueLocations.map((location, index) => (
                <MenuItem key={index} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={queryParams.category}
              onChange={handleCategoryChange}
              label="Category"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {categories?.map((category: any, index: any) => (
                <MenuItem key={index} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {!isLoading ? (
          <Box sx={{ width: "100%", display: "flex" }}>
            <Grid container spacing={{ xs: 2, md: 2 }}>
              {lostItems?.map((item: any, index: any) => (
                <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
                  <LostItemCard lostItem={item} user={user} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box display="flex" justifyContent="center" my={6}>
            <CircularProgress />
          </Box>
        )  }

        {/* Pagination Controls */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={Math.ceil((data?.meta?.total || 0) / queryParams.limit)}
            page={queryParams.page}
            onChange={handlePageChange}
          />
        </Box>
      </Stack>
    </>
  );
};

export default LostItems;
