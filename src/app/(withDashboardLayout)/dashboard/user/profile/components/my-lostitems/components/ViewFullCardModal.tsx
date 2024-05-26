import {
  Modal,
  Box,
  Typography,
  CardMedia,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RoomIcon from "@mui/icons-material/Room";

import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

export type TOpenProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  lostItem: any;
};

const ViewFullCardModal = ({ lostItem, open, setOpen }: TOpenProps) => {
  const handleClose = () => setOpen(false);

  const date = new Date(lostItem.createdAt);
  const formattedDate = date.toLocaleDateString();

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
          {lostItem?.itemImg && (
            <CardMedia
              component="img"
              height="200"
              image={lostItem.itemImg}
              alt="Lost Item Image"
              sx={{ borderRadius: 2, marginBottom: 2 }}
            />
          )}
        </Box>
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
      </Box>
    </Modal>
  );
};

export default ViewFullCardModal;
