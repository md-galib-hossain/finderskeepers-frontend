import FKModal from "@/components/FKModal/FKModal";
import FKDatePicker from "@/components/Forms/FKDatePicker";
import FKFileUploader from "@/components/Forms/FKFileUploader";
import FKForm from "@/components/Forms/FKForm";
import FKInput from "@/components/Forms/FKInput";
import FKSelectField from "@/components/Forms/FKSelectField";
import FKTextArea from "@/components/Forms/FKTextArea";
import { useClaimItemMutation } from "@/redux/api/claimApi";
import { useGetMyAllLostItemsQuery } from "@/redux/api/lostItemApi";
import uploadToImgBB from "@/utils/uploadToImgBB";
import { Box, Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export type TOpenProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user : any,
  foundItem : any
};

const ClaimFoundItemModal = ({ open, setOpen,user,foundItem }: TOpenProps) => {
const [claimItem,{isLoading : claiming}] = useClaimItemMutation()
const {data: lostItemPosts, isLoading : loadinglostItemPosts} = useGetMyAllLostItemsQuery({})
  const handleFormSubmit = async (values: FieldValues) => {
    const itemImg = await uploadToImgBB(values.file);
    delete values.file;
    values.itemImg = itemImg;
values.userId = user.id
values.foundItemId = foundItem.id
values.lostDate = new Date(values.lostDate).toISOString();

    console.log(values);
    try {
      const res = await claimItem(values).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Claim reported successfully!");
        setOpen(!open);
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  return (
    <FKModal open={open} setOpen={setOpen} title="Claim this item">
      <FKForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
        
          <Grid item xs={12} md={6}>
            <FKSelectField
              fullWidth={true}
              sx={{ width: "100%" }}
              items={lostItemPosts}
              name="lostItemId"
              label="My Lost Item Post*"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FKInput
              fullWidth={true}
              name="distinguishingFeatures"
              label="Distinguish Features"
            />
          </Grid>
        
          <Grid item xs={12}>
            <FKTextArea name="description" label="Details about Item" />
          </Grid>
          <Grid item xs={12} md={5}>
            <FKInput fullWidth={true} name="contactNo" label="Contact No." />
          </Grid>
          <Grid item xs={12} md={4}>
            <FKDatePicker  fullWidth={true} name="lostDate" label="Lost date" />
          </Grid>

          <Grid item xs={12} md={3}>
            <Box sx={{ width: "100%" }}>
              <FKFileUploader
                sx={{ width: "100%" }}
                name="file"
                label="Proof"
              />
            </Box>
          </Grid>
        </Grid>
        <Button
          disabled={claiming}
          sx={{ mt: 4, bgcolor: "#56E39F", "&:hover": { bgcolor: "#465775" } }}
          type="submit"
        >
          Submit
        </Button>
      </FKForm>
    </FKModal>
  );
};

export default ClaimFoundItemModal;
