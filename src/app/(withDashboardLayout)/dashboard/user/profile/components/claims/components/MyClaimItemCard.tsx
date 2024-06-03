
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { GridDeleteIcon } from "@mui/x-data-grid";
import RoomIcon from "@mui/icons-material/Room";
import { toast } from "sonner";
import { useState } from "react";
import { useMarkAsClaimedMyFoundItemMutation, useSoftDeleteMyFoundItemMutation } from "@/redux/api/foundItemApi";
import MyClaimItemModal from "./MyClaimItemModal";

const MyClaimItemCard = ({ claimItem }: { claimItem: any }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const maxTextLength = 100; // Adjust the length limit as needed
 

    const handleMarkAsClaim = async (id: string) => {
      // try {
      //   const res = await markAsClaimedMyFoundItem(id).unwrap();
      //   console.log(res);
      //   if (res.id) {
      //     toast.success("Found Item marked as claimed!!!");
      //   }
      // } catch (err: any) {
      //   console.log(err);
      // }
    };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const handleDelete = async (id: string) => {
    // try {
    //   const result = await softDeleteMyFoundItem(id).unwrap();
    //   console.log(result);
    //   if (result?.id) {
    //     toast.success("Found Item deleted successfully!!!");
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };
  

  const date = new Date(claimItem?.lostDate);
  const formattedDate = date.toLocaleDateString();
  return (
    <Box sx={{ width: "100%", position: "relative", margin: "0 auto" }}>
      <Card sx={{ width: "100%" }}>
        <Box sx={{ position: "relative" }}>
          <CardMedia
            sx={{ height: 140 }} 
            image={claimItem?.itemImg}
            title="lost item image"
          />
          {/* <Box
            sx={{
              position: "absolute",
              top: 2,
              right: 2,
              zIndex: 1,
              padding: "4px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "50%",
            }}
          >
            <IconButton
              disabled
              onClick={() => handleDelete(claimItem?.id)}
              aria-label="delete"
            >
              <GridDeleteIcon sx={{ color: "red" }} />
            </IconButton>
          </Box> */}
        </Box>
        <CardContent>
          <MyClaimItemModal
            claimItem={claimItem}
            open={isModalOpen}
            setOpen={setIsModalOpen}
          />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography gutterBottom variant="h5" component="h3" noWrap>
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
          <Typography variant="body2" color="text.secondary">
            <Box display="flex" alignItems="center">
              <Typography fontWeight={600} display="inline">
                Details:&nbsp;
              </Typography>
              <Tooltip title={claimItem?.description || ""}>
                <Typography display="inline" noWrap>
                  {truncateText(claimItem?.description || "", maxTextLength)}
                </Typography>
              </Tooltip>
             
            </Box>
          </Typography>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="body2" color="text.secondary">
              <Box display="flex" alignItems="center">
                <Typography fontWeight={600}>Lost date:&nbsp;</Typography>
                <Typography>{formattedDate}</Typography>
              </Box>
            </Typography>
            {/* <Box display={"flex"} alignItems={"center"}>
             
              <Typography fontWeight={600}>{claimItem?.user?.name}</Typography>
            </Box> */}
          </Box>
        </CardContent>
        <CardActions>
          {" "}
          <Button
            fullWidth={true}
            variant="outlined"
            size={"large"}
            sx={{
              borderColor: "#EF6F6C",
              color: "#EF6F6C",
              "&:hover": {
                borderColor: "#465775",
                color: "#465775",
              },
            }}
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            View Post
          </Button>
         
         
        </CardActions>
      </Card>
    </Box>
  );
};

export default MyClaimItemCard;
