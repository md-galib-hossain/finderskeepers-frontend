import {
  Modal,
  Box,
  Typography,
  CardMedia,
  Chip,
  IconButton,
  Button,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RoomIcon from "@mui/icons-material/Room";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { useState } from "react";
import FKForm from "@/components/Forms/FKForm";
import FKInput from "@/components/Forms/FKInput";
import FKSelectField from "@/components/Forms/FKSelectField";
import FKFileUploader from "@/components/Forms/FKFileUploader";
import uploadToImgBB from "@/utils/uploadToImgBB";
import { FieldValues } from "react-hook-form";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { toast } from "sonner";
import FKTextArea from "@/components/Forms/FKTextArea";
import EditIcon from '@mui/icons-material/Edit';
import { useUpdateFoundItemMutation } from "@/redux/api/foundItemApi";
export type TOpenProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  foundItem: any;
};

const ViewFullCardModal = ({ foundItem, open, setOpen }: TOpenProps) => {
  const [editable, setEditable] = useState(false);
  const handleClose = () => setOpen(false);
  const [updateFoundItem, { isLoading: updating }] = useUpdateFoundItemMutation();
  const date = new Date(foundItem.createdAt);
  const formattedDate = date.toLocaleDateString();

  const { data: categories, isLoading } = useGetAllCategoriesQuery({});

  const handleFormSubmit = async (values: FieldValues) => {
    if (values.file) {
      const itemImg = await uploadToImgBB(values.file);
      delete values.file;
      values.itemImg = itemImg;
    }else{
      values.itemImg = foundItem?.itemImg
      delete values.file;

    }
    console.log(values.file);
    console.log(values.itemImg);
    console.log(values);

    try {
      values.id = foundItem?.id
      const res = await updateFoundItem(values).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Found Item updated successfully!");
        setOpen(!open);
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const defaultValues = {
    name: foundItem?.name || "",
    description: foundItem?.description || "",
    categoryId: foundItem?.categoryId || "",
    contactNo:foundItem?.contactNo || "",
    location: foundItem?.location || "",
    file: null,
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "600px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            overflowY: "auto",
            maxHeight: "90vh",
          }}
        >
          <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ position: "relative" }}>
            {foundItem?.itemImg && (
              <CardMedia
                component="img"
                height="150" // Adjusted height
                image={foundItem.itemImg}
                alt="Lost Item Image"
                sx={{ borderRadius: 2, marginBottom: 2 }}
              />
            )}
          </Box>
          {editable ? (
            <>
              <FKForm
                defaultValues={foundItem && defaultValues}
                onSubmit={handleFormSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FKInput
                      fullWidth={true}
                      name="name"
                      label="Name of Item"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FKSelectField
                      fullWidth={true}
                      sx={{ width: "100%" }}
                      items={categories}
                      name="categoryId"
                      label="Category"
                    />
                  </Grid>
                  <Grid item xs={12}>
                  
                    <FKTextArea
                     name="description"
                     label="Details about Item"
                    />
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <FKInput
                      fullWidth={true}
                      name="contactNo"
                      label="Contact No."
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FKInput
                      fullWidth={true}
                      name="location"
                      label="Location"
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box sx={{ width: "100%" }}>
                      <FKFileUploader
                        sx={{ width: "100%" }}
                        name="file"
                        label="Upload"
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Box display={"flex"} justifyContent={"space-between"}>
              <Box mt={2}>
                <Button
                  variant="contained"
                 
                  onClick={() => setEditable(!editable)}
                  sx={{
                  
                    bgcolor: "#465775",
                    "&:hover": {
                      bgcolor: "#EF6F6C",
                    },
                
                }}
                >
                  Cancel
                </Button>
              </Box>
              <Box mt={2}>
                <Button disabled={updating} variant="contained" type="submit" sx={{
                  
                  bgcolor: "#56E39F",
                  "&:hover": {
                    bgcolor: "#465775",
                  },
              
              }}>
                  Update
                </Button>
              </Box>
            </Box>
              </FKForm>
            </>
          ) : (
            <>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography
                  id="modal-modal-title"
                  variant="h4"
                  component="h2"
                  gutterBottom
                >
                  {foundItem.name}
                </Typography>
                {foundItem.foundItemStatus === "NOTFOUND" ? (
                  <Chip
                    size="small"
                    sx={{ borderColor: "#EF6F6C", color: "#EF6F6C" }}
                    label="Not Claimed"
                    variant="outlined"
                  />
                ) : (
                  <Chip
                    size="small"
                    sx={{ bgcolor: "#56E39F", color: "white" }}
                    label="Claimed"
                  />
                )}
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {foundItem.category.name}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Description:</strong> {foundItem.description}
              </Typography>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography variant="body1" paragraph>
                  <strong>Date Lost:</strong> {formattedDate}
                </Typography>
                <Box display={"flex"} alignItems={"center"}>
                  <Box sx={{ fontSize: 15, mr: 1 }}>
                    <RoomIcon fontSize="inherit" />
                  </Box>
                  <Typography fontWeight={600}>{foundItem.location}</Typography>
                </Box>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Box sx={{ fontSize: 20, mr: 1 }}>
                  <PermContactCalendarIcon fontSize="inherit" />
                </Box>
                <Typography>{foundItem.contactNo}</Typography>
              </Box>
            </>
          )}
          {!editable && foundItem.foundItemStatus === "NOTFOUND" &&
         
<Box mt={2} display={"flex"} justifyContent={"end"}>
              <Button
                variant="contained"
                size={"medium"}
                color="primary"
                onClick={() => setEditable(!editable)}
                sx={{
                  
                    bgcolor: "#EF6F6C",
                    "&:hover": {
                      bgcolor: "#465775",
                    },
                
                }}
              >
               <EditIcon/>
              </Button>
            </Box>
          }
        </Box>
      </Modal>
    </>
  );
};

export default ViewFullCardModal;
