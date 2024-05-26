import { useSoftDeleteMyLostItemMutation } from "@/redux/api/lostItemApi";
import {
  Box,
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
import { toast } from "sonner";

const MyLostItemCard = ({ lostItem }: { lostItem: any }) => {
  const maxTextLength = 100; // Adjust the length limit as needed
  const [softDeleteMyLostItem, { isLoading: deleting }] =
    useSoftDeleteMyLostItemMutation();

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await softDeleteMyLostItem(id).unwrap();
      console.log(result);
      if (result?.id) {
        toast.success("Lost Item deleted successfully!!!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(lostItem);
  
  const date = new Date(lostItem.createdAt);
  const formattedDate = date.toLocaleDateString();
  return (
    <Box sx={{ width: "100%", position: "relative", margin: "0 auto" }}>
      <Card sx={{ width: "100%" }}>
        <Box sx={{ position: "relative" }}>
          <CardMedia
            sx={{ height: 140 }}
            image={lostItem?.itemImg}
            title="lost item image"
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
            <IconButton
              disabled={deleting}
              onClick={() => handleDelete(lostItem.id)}
              aria-label="delete"
            >
              <GridDeleteIcon sx={{ color: "red" }} />
            </IconButton>
          </Box>
        </Box>
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography gutterBottom variant="h5" component="h3" noWrap>
              {lostItem?.name}
            </Typography>
            {lostItem?.lostItemStatus === "NOTFOUND" ? (
              <Chip size="small" sx={{borderColor : "#EF6F6C", color : "#EF6F6C"}} label="Not Found" variant="outlined" />
            ) : (
              <Chip size="small" sx={{ bgcolor : "#56E39F", color:"white"}} label="Found" />
            )}
          </Box>
          <Typography
            color={"#EF6F6C"}
            gutterBottom
            variant="body2"
            component="h6"
            noWrap
          >
            {lostItem?.category?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Box display="flex" alignItems="center">
              <Typography fontWeight={600} display="inline">
                Details:&nbsp;
              </Typography>
              <Tooltip title={lostItem?.description || ""}>
                <Typography display="inline" noWrap>
                  {truncateText(lostItem?.description || "", maxTextLength)}
                </Typography>
              </Tooltip>
            </Box>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Box display="flex" alignItems="center">
              <Typography fontWeight={600}>
                Lost date:&nbsp;
              </Typography>
                <Typography >
                  {formattedDate}
                </Typography>
            </Box>
          </Typography>
        
        </CardContent>
        <CardActions>{/* Add any actions if needed */}</CardActions>
      </Card>
    </Box>
  );
};

export default MyLostItemCard;
