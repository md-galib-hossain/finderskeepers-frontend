import FKModal from "@/components/FKModal/FKModal";
import FKDatePicker from "@/components/Forms/FKDatePicker";
import FKFileUploader from "@/components/Forms/FKFileUploader";
import FKForm from "@/components/Forms/FKForm";
import FKInput from "@/components/Forms/FKInput";
import FKSelectField from "@/components/Forms/FKSelectField";
import FKTextArea from "@/components/Forms/FKTextArea";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useCreateLostItemMutation } from "@/redux/api/lostItemApi";
import { getUserFromLocalStorage } from "@/utils/local-storage";
import uploadToImgBB from "@/utils/uploadToImgBB";
import { Box, Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export type TOpenProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MyLostItemModal = ({ open, setOpen }: TOpenProps) => {
  const [createLostItem, { isLoading: creating }] = useCreateLostItemMutation();
  const { data: categories, isLoading } = useGetAllCategoriesQuery({});
  
  const handleFormSubmit = async (values: FieldValues) => {
    const user =await getUserFromLocalStorage()
    const itemImg = await uploadToImgBB(values.file);
    delete values.file;
    values.itemImg = itemImg;
    values.lostDate = new Date(values.lostDate).toISOString();
    values.userId = user?.id
    console.log(values);
    try {
      const res = await createLostItem(values).unwrap();
      console.log(res);
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
          <Grid item xs={12} md={6}>
            <FKInput fullWidth={true} name="name" label="Name of Item" />
          </Grid>
          <Grid item xs={12} md={6}>
            <FKSelectField fullWidth={true} sx={{ width: "100%" }} items={categories} name="categoryId" label="Category" />
          </Grid>
          <Grid item xs={12}>
          <FKTextArea
                     name="description"
                     label="Details about Item"
                    />
          </Grid>
          <Grid item xs={12} md={4}>
            <FKInput fullWidth={true} name="contactNo" label="Contact No." />
          </Grid>
          <Grid item xs={12} md={4}>
            <FKInput fullWidth={true} name="location" label="Location" />
          </Grid>
          <Grid item xs={12} md={4}>
            <FKDatePicker  fullWidth={true} name="lostDate" label="Lost date" />
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ width : "100%"}}>
            <FKFileUploader sx={{ width : "100%"}} name="file" label="Upload" />
            </Box>
          </Grid>
        </Grid>
        <Button 
          disabled={creating} 
          sx={{ mt: 4, bgcolor: "#56E39F", "&:hover": { bgcolor: "#465775" } }} 
          type="submit"
        >
          Add Item
        </Button>
      </FKForm>
    </FKModal>
  );
};

export default MyLostItemModal;