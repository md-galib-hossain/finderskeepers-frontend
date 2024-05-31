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
import PersonIcon from "@mui/icons-material/Person";
import {
  useApproveClaimItemMutation,
  useRejectClaimItemMutation,
  useUpdateMyClaimItemMutation,
} from "@/redux/api/claimApi";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import FKDatePicker from "@/components/Forms/FKDatePicker";
import DoneIcon from "@mui/icons-material/Done";
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

const ClaimsOnMyItemModal = ({ claimItem, open, setOpen }: TOpenProps) => {
  const handleClose = () => setOpen(false);

  const [rejectClaimItem, { isLoading: rejecting }] =
    useRejectClaimItemMutation();
  const [approveClaimItem, { isLoading: approving }] =
    useApproveClaimItemMutation();
  const date = new Date(claimItem.lostDate);
  const formattedDate = date.toLocaleDateString();

  const handleApprove = async () => {
    try {
      const res = await approveClaimItem(claimItem?.id).unwrap();
      console.log(res);
      if (res.id) {
        toast.success("Claim Item Approved successfully!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };
  const handleReject = async () => {
    try {
      const res = await rejectClaimItem(claimItem?.id).unwrap();
      console.log(res);
      if (res.id) {
        toast.error("Claim Item Rejected");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err?.message);
    }
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
                <Typography fontWeight={600}>{claimItem?.location}</Typography>
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
                  label="Claiming User's Information"
                  size="small"
                />
              </Divider>
              <Typography variant="body1" paragraph>
                <strong>Name:</strong> {claimItem?.user?.name}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Email:</strong> {claimItem?.user?.email}
              </Typography>
            </Box>
            {claimItem?.lostItem && (
              <Box>
                <Divider>
                  <Chip
                    icon={<PersonIcon />}
                    label="Claiming User's Lost Item Info"
                    size="small"
                  />
                </Divider>

                <Box sx={{ position: "relative" }}>
                  {claimItem?.lostItem?.itemImg && (
                    <CardMedia
                      component="img"
                      height="150" // Adjusted height
                      image={claimItem?.lostItem?.itemImg}
                      alt="Lost Item Image"
                      sx={{ borderRadius: 2, marginBottom: 2 }}
                    />
                  )}
                </Box>
                <Typography variant="body1" paragraph>
                  <strong>Name:</strong> {claimItem?.lostItem.name}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Description:</strong>{" "}
                  {claimItem?.lostItem.description}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Lost Date:</strong> {claimItem?.lostItem?.lostDate}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Location:</strong> {claimItem?.lostItem?.location}
                </Typography>
              </Box>
            )}
          </>

          { claimItem?.status === "PENDING" && (
            <Box mt={2} display={"flex"} justifyContent={"end"}>
              <Button
                disabled={rejecting}
                variant="contained"
                endIcon={<ThumbDownAltIcon />}
                size={"medium"}
                color="primary"
                onClick={handleReject}
                sx={{
                  marginRight: 1,
                  bgcolor: "#EF6F6C",
                  "&:hover": {
                    bgcolor: "#EF6F6C",
                  },
                }}
              >
                Reject
              </Button>
              <Button
                disabled={approving}
                variant="contained"
                endIcon={<DoneIcon />}
                size={"medium"}
                color="primary"
                onClick={handleApprove}
                sx={{
                  bgcolor: "#56E39F",
                  "&:hover": {
                    bgcolor: "#56E39F",
                  },
                }}
              >
                Approve
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ClaimsOnMyItemModal;
