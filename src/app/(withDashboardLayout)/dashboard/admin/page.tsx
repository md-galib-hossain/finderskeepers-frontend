"use client";
import { useGetAllClaimItemsQuery } from "@/redux/api/claimApi";
import { useGetAllFoundItemsQuery } from "@/redux/api/foundItemApi";
import { useGetAllLostItemsQuery } from "@/redux/api/lostItemApi";
import { useGetUsersQuery } from "@/redux/api/userApi";
import FoundItemVisual from "./components/FoundItemVisual/FoundItemVisual";
import LostItemVisual from "./components/LostItemVisual/LostItemVisual";
import UserVisual from "./components/UserVisual/UserVisual";
import ClaimVisual from "./components/ClaimVisual/ClaimVisual";
import { Grid } from "@mui/material";

const AdminPage = () => {
  const { data: lostItems, isLoading } = useGetAllLostItemsQuery({});
  const { data: foundItems, isLoading: loadingFoundItems } =
    useGetAllFoundItemsQuery({});
  const { data :claims, isLoading: loadingClaims } = useGetAllClaimItemsQuery(
    {}
  );
  const { data, isLoading: loadingUsers } = useGetUsersQuery({});

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6}>
      {loadingFoundItems || <FoundItemVisual foundItems={foundItems?.foundItems}/>}
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
      {isLoading || <LostItemVisual lostItems={lostItems?.lostItems} />}  
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
      {loadingUsers || <UserVisual users={data?.users}/>}
 
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        {loadingClaims || <ClaimVisual claims={claims} />}
      </Grid>
    </Grid>
  );
};

export default AdminPage;
