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
import { useUpdateLostItemMutation } from "@/redux/api/lostItemApi";
import { toast } from "sonner";
import FKTextArea from "@/components/Forms/FKTextArea";
import EditIcon from '@mui/icons-material/Edit';
export type TOpenProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  lostItem: any;
};

const ViewFullCardModal = ({ lostItem, open, setOpen }: TOpenProps) => {
  const [editable, setEditable] = useState(false);
  const handleClose = () => setOpen(false);
  const [updateLostItem, { isLoading: updating }] = useUpdateLostItemMutation();
  const date = new Date(lostItem.createdAt);
  const formattedDate = date.toLocaleDateString();

  const { data: categories, isLoading } = useGetAllCategoriesQuery({});

  const handleFormSubmit = async (values: FieldValues) => {
    if (values.file) {
      const itemImg = await uploadToImgBB(values.file);
      delete values.file;
      values.itemImg = itemImg;
    }else{
      values.itemImg = lostItem?.itemImg
      delete values.file;

    }
    console.log(values.file);
    console.log(values.itemImg);
    console.log(values);

    try {
      values.id = lostItem?.id
      const res = await updateLostItem(values).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Lost Item updated successfully!");
        setOpen(!open);
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const defaultValues = {
    name: lostItem?.name || "",
    description: lostItem?.description || "",
    categoryId: lostItem?.categoryId || "",
    contactNo: lostItem?.contactNo || "",
    location: lostItem?.location || "",
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
            {lostItem?.itemImg && (
              <CardMedia
                component="img"
                height="150" // Adjusted height
                image={lostItem.itemImg}
                alt="Lost Item Image"
                sx={{ borderRadius: 2, marginBottom: 2 }}
              />
            )}
          </Box>
          {editable ? (
            <>
              <FKForm
                defaultValues={lostItem && defaultValues}
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
                  {lostItem.name}
                </Typography>
                {lostItem.lostItemStatus === "NOTFOUND" ? (
                  <Chip
                    size="small"
                    sx={{ borderColor: "#EF6F6C", color: "#EF6F6C" }}
                    label="Not Found"
                    variant="outlined"
                  />
                ) : (
                  <Chip
                    size="small"
                    sx={{ bgcolor: "#56E39F", color: "white" }}
                    label="Found"
                  />
                )}
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {lostItem.category.name}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Description:</strong> {lostItem.description}
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
                  <Typography fontWeight={600}>{lostItem.location}</Typography>
                </Box>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Box sx={{ fontSize: 20, mr: 1 }}>
                  <PermContactCalendarIcon fontSize="inherit" />
                </Box>
                <Typography>{lostItem.contactNo}</Typography>
              </Box>
            </>
          )}
          {!editable && lostItem.lostItemStatus === "NOTFOUND" &&
         
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
