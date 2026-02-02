// UserList.jsx - Scalable version with React Query (caching, error handling, refetching)
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Stack,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsers, deleteUser } from "../api/authApi";  // Adjust path
import { Delete } from "@mui/icons-material";

const UserList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch users with React Query (built-in caching, staleTime, error handling)
  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],  // Cache key
    queryFn: getAllUsers,
    staleTime: 1 * 60 * 1000,  // Cache for 5 minutes (adjust as needed)
    cacheTime: 30 * 60 * 1000,  // Keep in cache for 30 minutes
    refetchOnWindowFocus: false,  // Optional: Don't refetch on focus
  });

  // Delete mutation with optimistic update + invalidation
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      // Invalidate and refetch users list after delete
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      alert(err.response?.data?.message || "Failed to delete user");
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteMutation.mutate(id);
    }
  };

  // Loading state (centered full screen)
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress size={80} thickness={5} />
      </Box>
    );
  }

  // Error state
  if (isError) {
    return (
      <Alert severity="error" sx={{ m: 4 }}>
        {error?.response?.data?.message || error?.message || "Failed to load users. Please try again."}
      </Alert>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",  // Light background (or add image like login if desired)
        py: 4,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 1200,
          mx: "auto",
          p: 4,
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.95)",  // Semi-transparent white card (like login)
        }}
      >
        <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center">
          All Registered Users
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>ID</b></TableCell>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell align="center"><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user._id}</TableCell>
                    <TableCell>{user.fullName || "N/A"}</TableCell>
                    <TableCell>{user.email || "N/A"}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => navigate(`/Users/${user._id}`)}
                        >
                          View
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => navigate(`/Users/edit/${user._id}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          startIcon={<Delete />}
                          onClick={() => handleDelete(user._id)}
                          disabled={deleteMutation.isLoading}
                        >
                          {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default UserList;