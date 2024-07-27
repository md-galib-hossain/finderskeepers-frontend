
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
import ViewFullCardModal from "./ViewFullCardModal";
import { useState } from "react";
import { useMarkAsClaimedMyFoundItemMutation, useSoftDeleteMyFoundItemMutation } from "@/redux/api/foundItemApi";

const MyFoundItemCard = ({ foundItem }: { foundItem: any }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const maxTextLength = 100; // Adjust the length limit as needed
  const [softDeleteMyFoundItem, { isLoading: deleting }] =
    useSoftDeleteMyFoundItemMutation();
  const [markAsClaimedMyFoundItem,{isLoading : claiming} ] = useMarkAsClaimedMyFoundItemMutation()

    const handleMarkAsClaim = async (id: string) => {
      try {
        const res = await markAsClaimedMyFoundItem(id).unwrap();
        console.log(res);
        if (res.id) {
          toast.success("Found Item marked as claimed!!!");
        }
      } catch (err: any) {
        console.log(err);
      }
    };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await softDeleteMyFoundItem(id).unwrap();
      console.log(result);
      if (result?.id) {
        toast.success("Found Item deleted successfully!!!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(foundItem);
  

  const date = new Date(foundItem?.foundDate);
  const formattedDate = date.toLocaleDateString();
  return (
    <Box sx={{ width: "100%", position: "relative", margin: "0 auto" }}>
      <Card sx={{ width: "100%" }}>
        <Box sx={{ position: "relative" }}>
          <CardMedia
            sx={{ height: 140 }}
            image={foundItem?.itemImg}
            title="Found item image"
          />
          <Box
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
            {/* <IconButton
              disabled={deleting}
              onClick={() => handleDelete(foundItem.id)}
              aria-label="delete"
            >
              <GridDeleteIcon sx={{ color: "red" }} />
            </IconButton> */}
          </Box>
        </Box>
        <CardContent>
          <ViewFullCardModal
            foundItem={foundItem}
            open={isModalOpen}
            setOpen={setIsModalOpen}
          />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography gutterBottom variant="h5" component="h3" noWrap>
              {foundItem?.name}
            </Typography>
            {foundItem?.foundItemStatus === "NOTFOUND" ? (
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
          <Typography variant="body2" color="text.secondary">
            <Box display="flex" alignItems="center">
              <Typography fontWeight={600} display="inline">
                Details:&nbsp;
              </Typography>
              <Tooltip title={foundItem?.description || ""}>
                <Typography display="inline" noWrap>
                  {truncateText(foundItem?.description || "", maxTextLength)}
                </Typography>
              </Tooltip>
            </Box>
          </Typography>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="body2" color="text.secondary">
              <Box display="flex" alignItems="center">
                <Typography fontWeight={600}>Found date:&nbsp;</Typography>
                <Typography>{formattedDate}</Typography>
              </Box>
            </Typography>
            <Box display={"flex"} alignItems={"center"}>
              <Box sx={{ fontSize: 15, mr: 1 }}>
                <RoomIcon fontSize="inherit" />
              </Box>
              <Typography fontWeight={600}>{foundItem.location}</Typography>
            </Box>
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
          { foundItem?.foundItemStatus === "NOTFOUND" && (
            <Button
              fullWidth={true}
              disabled={claiming}
              variant="contained"
              sx={{
                bgcolor: "#56E39F",
                "&:hover": {
                  bgcolor: "#465775",
                },
              }}
              onClick={() => handleMarkAsClaim(foundItem.id)}
            >
              Mark Claimed
            </Button>
          )}
         
        </CardActions>
      </Card>
    </Box>
  );
};

export default MyFoundItemCard;
