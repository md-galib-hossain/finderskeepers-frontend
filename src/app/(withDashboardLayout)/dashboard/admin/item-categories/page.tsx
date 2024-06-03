"use client"
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FKForm from "@/components/Forms/FKForm";
import FKInput from "@/components/Forms/FKInput";
import FKSelectField from "@/components/Forms/FKSelectField";
import { useCreateCategoryItemMutation, useGetAllCategoriesQuery, useUpdateItemCategoryMutation } from "@/redux/api/categoryApi";
import { FieldValues } from "react-hook-form";

const validationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  id: z.string().optional(),
});

const ItemcategoriesPage = () => {
  const [error, setError] = useState("");
  const { data: categories, isLoading, isError } = useGetAllCategoriesQuery({});
  const [createCategoryItem, { isLoading: creating }] = useCreateCategoryItemMutation();
  const [updateItemCategory, { isLoading: updating }] = useUpdateItemCategoryMutation();

  const handleAddCategory = async (values: FieldValues) => {
    console.log(values)
    try {
      const res = await createCategoryItem({ name: values.name });
    console.log(res)
      // Optionally, you can refetch categories here after adding a new one
    } catch (error) {
      setError("Couldn't create");
    }
  };

  const handleUpdateCategory = async (values: FieldValues) => {
    try {
      await updateItemCategory({ id: values.id, data: { name: values.name } });
      // Optionally, you can refetch categories here after updating
    } catch (error) {
      setError("Couldn't update");
    }
  };

  useEffect(() => {
    if (isError) {
      setError("Failed to fetch categories");
    }
  }, [isError]);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Item Categories
      </Typography>
      
      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}

      <Grid container spacing={4} mb={4}>
        {/* add */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Add Category
            </Typography>
            <FKForm
              onSubmit={handleAddCategory}
              resolver={zodResolver(validationSchema)}
            >
              <Grid container spacing={2}>
              
                <Grid item xs={12} sm={12}>
                  <FKInput name="name" label="New Category" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={creating}
                    fullWidth
                    sx={{
                      bgcolor: "#56E39F",
                      "&:hover": {
                        bgcolor: "#465775",
                      },
            
                    }}
                  >
                    {creating ? "Creating..." : "Create Category"}
                  </Button>
                </Grid>
              </Grid>
            </FKForm>
          </Box>
        </Grid>
{/* update */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Update Category
            </Typography>
            <FKForm
              onSubmit={handleUpdateCategory}
              resolver={zodResolver(validationSchema)}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FKSelectField
                    fullWidth
                    items={categories}
                    name="id"
                    label="Categories*"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FKInput name="name" label="New Category Name" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={updating}
                    fullWidth
                    sx={{
                      bgcolor: "#465775",
                      "&:hover": {
                        bgcolor: "#465775",
                      },
                    }}
                  >
                    {updating ? "Updating..." : "Update Category"}
                  </Button>
                </Grid>
              </Grid>
            </FKForm>
          </Box>
        </Grid>
      </Grid>

      {isLoading ? (
        <Box display="flex" justifyContent="center" my={6}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {categories?.map((category: any) => (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <Box
                border={1}
                borderColor="grey.300"
                borderRadius={2}
                p={2}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="100%"
              >
                <Typography variant="h6">{category.name}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ItemcategoriesPage;
