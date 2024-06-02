import {
    Modal,
    Box,
    Typography,
    IconButton,
    Button,
    Grid,
    Avatar
  } from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";
  import { useState } from "react";
  import FKForm from "@/components/Forms/FKForm";
  import FKInput from "@/components/Forms/FKInput";
  import FKFileUploader from "@/components/Forms/FKFileUploader";
  import FKTextArea from "@/components/Forms/FKTextArea";
  import { FieldValues } from "react-hook-form";
  import { toast } from "sonner";
  import { useUpdateMyProfileMutation } from "@/redux/api/myProfile";
  import modifyUpdateFormData from "@/utils/modifyUpdateFormData";
  
  export type TEditProfileModalProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    user: any;
  };
  
  const EditProfileModal = ({ open, setOpen, user }: TEditProfileModalProps) => {
    const handleClose = () => setOpen(false);
    const [updateMyProfile, { isLoading: updating }] = useUpdateMyProfileMutation();
  
    const handleFormSubmit = async (values: FieldValues) => {
        const processValues = {
            name: user?.name,
            email: user?.email,
            bio: user?.profile?.bio,
            age: user?.profile?.age,
            profilePhoto: user?.profilePhoto
        }
      const updatedValues = await modifyUpdateFormData(values, processValues);
      console.log(updatedValues);
      try {
        if(updatedValues.age) updatedValues.age =Number(updatedValues.age)
        if(updatedValues.itemImg) {
            updatedValues.profilePhoto =updatedValues.itemImg
            delete updatedValues.itemImg
        }
        const res = await updateMyProfile(updatedValues).unwrap();
        console.log(res);
        if (res?.id) {
          toast.success("Profile updated successfully!");
          setOpen(false);
        }
      } catch (err: any) {
        console.error(err?.message);
      }
    };
  
   
    const defaultValues = {
      name: user?.name || "",
      email: user?.email || "",
      bio: user?.profile?.bio || "",
      age: user?.profile?.age || "",
      profilePhoto: user?.profilePhoto || "",
      file: null,
    };
  
    return (
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
            <Avatar
              alt="profile photo"
              src={user?.profilePhoto}
              sx={{ width: 150, height: 150, margin: 'auto' }}
            />
          </Box>
          <FKForm
            defaultValues={defaultValues}
            onSubmit={handleFormSubmit}
          >
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <FKInput
                  fullWidth={true}
                  name="name"
                  label="Name"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FKInput
                  fullWidth={true}
                  name="email"
                  label="Email"
                />
              </Grid>
              <Grid item xs={12}>
                <FKTextArea
                  name="bio"
                  label="Bio"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FKInput
                  fullWidth={true}
                  name="age"
                  label="Age"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FKFileUploader
                  
                  name="file"
                  label="Profile Photo"
                />
              </Grid>
            </Grid>
            <Box display={"flex"} justifyContent={"space-between"} mt={3}>
              <Button
                variant="contained"
                onClick={handleClose}
                sx={{
                  bgcolor: "#465775",
                  "&:hover": {
                    bgcolor: "#EF6F6C",
                  },
                }}
              >
                Cancel
              </Button>
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
          </FKForm>
        </Box>
      </Modal>
    );
  };
  
  export default EditProfileModal;
  