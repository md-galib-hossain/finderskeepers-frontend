import {
  Modal,
  Box,
  Typography,
  CardMedia,
  Chip,
  IconButton,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { useState } from "react";
import FKForm from "@/components/Forms/FKForm";
import FKInput from "@/components/Forms/FKInput";
import FKFileUploader from "@/components/Forms/FKFileUploader";
import uploadToImgBB from "@/utils/uploadToImgBB";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import FKTextArea from "@/components/Forms/FKTextArea";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import { useUpdateMyClaimItemMutation } from "@/redux/api/claimApi";
import FKDatePicker from "@/components/Forms/FKDatePicker";
import modifyUpdateFormData from "@/utils/modifyUpdateFormData";

export type TOpenProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  claimItem: any;
};
export type TClaimUpdate = {
  id?: string;
  description?: string;
  lostDate?: string;
  distinguishingFeatures?: string;
  itemImg?: string;
  contactNo?: string;
  file?: any;
};

const MyClaimItemModal = ({ claimItem, open, setOpen }: TOpenProps) => {
  const [editable, setEditable] = useState(false);
  const handleClose = () => setOpen(false);
  const [updateMyClaimItem, { isLoading: updating }] =
    useUpdateMyClaimItemMutation();
  const date = new Date(claimItem.lostDate);
  const formattedDate = date.toLocaleDateString();

  const handleFormSubmit = async (values: FieldValues) => {
    // values.lostDate = new Date(values.lostDate).toISOString();

    // const updatedValues: TClaimUpdate = {};

    // // Check if each field has changed
    // for (const key in values) {
    //   if (values[key] !== claimItem[key]) {
    //     (updatedValues as any)[key] = values[key];
    //   }
    // }

    // if (values.file) {
    //   const itemImg = await uploadToImgBB(values.file);
    //   updatedValues.itemImg = itemImg;
    //   delete updatedValues.file;
    // }
    // delete updatedValues.file;
    const updatedValues : Record<string,any> =await modifyUpdateFormData(values,claimItem)

    try {
      updatedValues.id = claimItem.id;
      console.log(updatedValues)
      const res = await updateMyClaimItem(updatedValues).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Claim Item updated successfully!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err?.message);
    }
    console.log(updatedValues);
  };

  const defaultValues = {
    description: claimItem?.description || "",
    contactNo: claimItem?.contactNo || "",
    distinguishingFeatures: claimItem?.distinguishingFeatures || "",
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
            {claimItem?.itemImg && (
              <CardMedia
                component="img"
                height="150" // Adjusted height
                image={claimItem?.itemImg}
                alt="Claim Item Image"
                sx={{ borderRadius: 2, marginBottom: 2 }}
              />
            )}
          </Box>
          {editable ? (
            <>
              <FKForm defaultValues={defaultValues} onSubmit={handleFormSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FKTextArea name="description" label="Description" />
                  </Grid>
                  <Grid item xs={12}>
                    <FKTextArea
                      name="distinguishingFeatures"
                      label="Distinguishing Features"
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
                    <FKDatePicker
                      fullWidth={true}
                      name="lostDate"
                      label="Lost date"
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
                      onClick={() => setEditable(false)}
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
                    <Button
                      disabled={updating}
                      variant="contained"
                      type="submit"
                      sx={{
                        bgcolor: "#56E39F",
                        "&:hover": {
                          bgcolor: "#465775",
                        },
                      }}
                    >
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
                  {claimItem?.foundItem?.name}
                </Typography>
                {claimItem?.status === "PENDING" ? (
                  <Chip
                    size="small"
                    sx={{ borderColor: "#EF6F6C", color: "#EF6F6C" }}
                    label="Pending"
                    variant="outlined"
                  />
                ) : claimItem?.status === "APPROVED" ? (
                  <Chip
                    size="small"
                    sx={{ bgcolor: "#56E39F", color: "white" }}
                    label="Approved"
                  />
                ) : (
                  <Chip
                    size="small"
                    sx={{ bgcolor: "#FF6F6C", color: "white" }}
                    label="Rejected"
                  />
                )}
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {claimItem?.foundItem?.category?.name}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Description:</strong> {claimItem?.description}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Distinguishing Features:</strong>{" "}
                {claimItem?.distinguishingFeatures}
              </Typography>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography variant="body1" paragraph>
                  <strong>Lost Date:</strong> {formattedDate}
                </Typography>
                <Box display={"flex"} alignItems={"center"}>
                  <Typography fontWeight={600}>
                    {claimItem?.location}
                  </Typography>
                </Box>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Box sx={{ fontSize: 20, mr: 1 }}>
                  <PermContactCalendarIcon fontSize="inherit" />
                </Box>
                <Typography>{claimItem?.contactNo}</Typography>
              </Box>
              <Box>
                <Divider>
                  <Chip
                    icon={<PersonIcon />}
                    label="Founded User Information"
                    size="small"
                  />
                </Divider>
                <Typography variant="body1" paragraph>
                  <strong>Name:</strong> {claimItem?.user?.name}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Email:</strong> {claimItem?.user?.email}
                </Typography>
              {claimItem?.status === "APPROVED" &&   <Typography variant="body1" paragraph>
                  <strong>Email:</strong> {claimItem?.user?.email}
                </Typography>}
              </Box>
            </>
          )}
          {!editable && claimItem?.status === "PENDING" && (
            <Box mt={2} display={"flex"} justifyContent={"end"}>
              <Button
                variant="contained"
                size={"medium"}
                color="primary"
                onClick={() => setEditable(true)}
                sx={{
                  bgcolor: "#EF6F6C",
                  "&:hover": {
                    bgcolor: "#465775",
                  },
                }}
              >
                <EditIcon />
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default MyClaimItemModal;
