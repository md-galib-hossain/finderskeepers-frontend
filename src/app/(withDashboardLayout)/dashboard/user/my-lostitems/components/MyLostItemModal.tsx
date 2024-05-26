
// import { useCreateSpecialtyMutation } from "@/redux/api/specialtiesApi";
import FKModal from "@/components/FKModal/FKModal";
import FKFileUploader from "@/components/Forms/FKFileUploader";
import FKForm from "@/components/Forms/FKForm";
import FKInput from "@/components/Forms/FKInput";
import FKSelectField from "@/components/Forms/FKSelectField";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useCreateLostItemMutation } from "@/redux/api/lostItemApi";
import uploadToImgBB from "@/utils/uploadToImgBB";
import {  Button, Grid } from "@mui/material";

import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
export type TOpenProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const MyLostItemModal = ({ open, setOpen }: TOpenProps) => {
  const [createLostItem, {
    isLoading : creating
  }] = useCreateLostItemMutation();
  const {data:categories,isLoading} = useGetAllCategoriesQuery({})
  const handleFormSubmit = async (values: FieldValues) => {
    const itemImg =await uploadToImgBB(values.file)
    delete(values.file)
    values.itemImg = itemImg
    
   console.log(values)
    try {

      const res = await createLostItem(values).unwrap();
      console.log(res)
      if (res?.id) {
        toast.success("Lost Item reported successfully!");
        setOpen(!open);
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };
  


  return (
    <FKModal open={open} setOpen={setOpen} title="Add a lost item">
      <FKForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <FKInput fullWidth={true} name="name" label="Name of Item" />
          </Grid>
          <Grid item md={6}>
            <FKSelectField fullWidth={true} sx={{width : "100%"}} items={categories} name="categoryId" label="Category" />
          </Grid>
          <Grid item md={6}>
            <FKInput fullWidth={true}  name="description" label="Details about Item" />
          </Grid>
          <Grid item md={3}>
            <FKInput fullWidth={true}  name="location" label="Location" />
          </Grid>
          <Grid item md={3}>
            <FKFileUploader name="file" label="Upload" />
          </Grid>
        </Grid>
        <Button disabled={creating} sx={{ mt: 4 , bgcolor: "#56E39F",
                "&:hover": {
                  bgcolor: "#465775",
                },}} type="submit">
          Add Item
        </Button>
      </FKForm>
    </FKModal>
  );
};

export default MyLostItemModal;
