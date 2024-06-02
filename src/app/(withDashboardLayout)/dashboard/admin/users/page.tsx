"use client";
import { useGetUsersQuery, useUpdateUserStatusMutation } from "@/redux/api/userApi";
import { Box, Button, CircularProgress, Pagination, Typography } from "@mui/material";
import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { TMeta } from "@/types";

const UsersPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [rowLoading, setRowLoading] = useState<{ [key: string]: boolean }>({});

  const { data, isLoading } = useGetUsersQuery({
    page,
    limit: pageSize,
  });

  const [updateUserStatus] = useUpdateUserStatusMutation();

  const handleChange = async (id: string, value: string) => {
    if (value !== null) {
      setRowLoading((prev) => ({ ...prev, [id]: true }));
      try {
        const data = { id, data: { status: value } };
        const result = await updateUserStatus(data);
        console.log(result);
      } catch (err) {
        console.log(err);
      } finally {
        setRowLoading((prev) => ({ ...prev, [id]: false }));
      }
    }
  };

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Full name", flex: 1 },
    { field: "userName", headerName: "User name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "age", headerName: "Age", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const isActive = params.row.status === "ACTIVE";
        const isLoading = rowLoading[params.row.id];
        return isLoading ? (
          <CircularProgress size={24} />
        ) : isActive ? (
          <CheckCircle color="success" />
        ) : (
          <Cancel color="error" />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row }) => {
        const isLoading = rowLoading[row.id];
        return isLoading ? (
          <CircularProgress size={24} />
        ) : row.status === "ACTIVE" ? (
          <Button
            size="small"
            sx={{
              bgcolor: "#EF6F6C",
              "&:hover": {
                bgcolor: "#EF6F6C",
              },
            }}
            onClick={() => handleChange(row.id, "INACTIVE")}
          >
            Deactivate
          </Button>
        ) : (
          <Button
            size="small"
            sx={{
              bgcolor: "#56E39F",
              "&:hover": {
                bgcolor: "#56E39F",
              },
            }}
            onClick={() => handleChange(row.id, "ACTIVE")}
          >
            Activate
          </Button>
        );
      },
    },
  ];

  // Flatten the user data
  const flattenedUsers = data?.users?.map((user: any) => ({
    id: user.id,
    name: user.name,
    userName: user.userName,
    email: user.email,
    bio: user.profile?.bio || "",
    age: user.profile?.age || "",
    role: user.role,
    status: user.status,
  }));

  console.log(flattenedUsers);

  return (
    <>
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      ) : (
       <>
        <Typography variant="h4" component="h1" gutterBottom>
        Users
      </Typography>
       <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DataGrid
            rows={flattenedUsers}
            columns={columns}
            autoHeight
            disableColumnMenu
            disableRowSelectionOnClick
            hideFooter
            sx={{
              "& .MuiDataGrid-cell:hover": {
                backgroundColor: "transparent",
              },
              "& .MuiDataGrid-row.Mui-selected": {
                backgroundColor: "transparent",
              },
              "& .MuiDataGrid-cellCheckbox": {
                display: "none",
              },
            }}
          />
          <Box display={"flex"} marginTop={5} justifyContent={"center"}>
            <Pagination
              count={Math.ceil((data?.meta as TMeta)?.total / pageSize)}
              page={page}
              onChange={handlePaginationChange}
            />
          </Box>
        </Box>
       </>
      )}
    </>
  );
};

export default UsersPage;
