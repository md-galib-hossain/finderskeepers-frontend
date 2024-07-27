"use client";
import { Box, Button, Grid, Stack, Typography, TextField, MenuItem, Select, FormControl, InputLabel, Pagination } from '@mui/material';
import { useState } from 'react';
import { getUserInfo } from '@/app/services/auth.services';
import { useGetAllFoundItemsQuery } from '@/redux/api/foundItemApi';
import FoundItemCard from './components/FoundItemCard';
import MyFoundItemModal from '../profile/components/my-founditems/components/MyFoundItemModal';
import { useGetAllCategoriesQuery } from '@/redux/api/categoryApi';

const FoundItems = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 10,
    location: '',
    category: '',
    searchTerm: ''
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

  const { data, isLoading } = useGetAllFoundItemsQuery(constructQueryParams());
  const { data: categories, isLoading: loadingCategories } = useGetAllCategoriesQuery({});

  const foundItems = data?.foundItems


// Extract unique locations
let uniqueLocations: string[] = [];
if (foundItems) {
  const locationSet = new Set<string>();
  for (const item of foundItems) {
    locationSet.add(item.location);
  }
  uniqueLocations = Array.from(locationSet);
}

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setQueryParams(prev => ({ ...prev, page: value }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryParams(prev => ({ ...prev, searchTerm: event.target.value }));
  };

  const handleLocationChange = (event: any) => {
    setQueryParams(prev => ({ ...prev, location: event.target.value }));
  };

  const handleCategoryChange = (event: any) => {
    setQueryParams(prev => ({ ...prev, category: event.target.value }));
  };

  console.log(queryParams)
  return (
    <>
      <Button
        variant="contained"
        size="large"
        sx={{
          bgcolor: "#56E39F",
          "&:hover": {
            bgcolor: "#465775",
          },
        }}
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        Upload A Found Item
      </Button>
      <MyFoundItemModal open={isModalOpen} setOpen={setIsModalOpen} />

      <Stack justifyContent="center" alignItems="center" spacing={2} sx={{ width: "100%" }}>
        <Box>
          <Typography variant='h6' fontWeight="600" component="h1">Found Items</Typography>
        </Box>

        {/* Filters and Search */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
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
              <MenuItem value=""><em>All</em></MenuItem>
              {uniqueLocations.map((location, index) => (
                <MenuItem key={index} value={location}>{location}</MenuItem>
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
              <MenuItem value=""><em>All</em></MenuItem>
              {categories?.map((category: any, index: any) => (
                <MenuItem key={index} value={category.name}>{category.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ width: "100%", display: "flex" }}>
          <Grid container spacing={{ xs: 2, md: 2 }}>
            {foundItems?.map((item: any, index: any) => (
              <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
                <FoundItemCard foundItem={item} user={user} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Pagination Controls */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={Math.ceil((data?.meta?.total || 0) / queryParams.limit)}
            page={queryParams.page}
            onChange={handlePageChange}
          />
        </Box>
      </Stack>
    </>
  );
}

export default FoundItems;
