import { useEffect, useState } from "react";
import { Box, Paper, Typography, Button, CircularProgress, Alert } from "@mui/material";  // Added Alert for better error display
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const GetAllUser = () => {
  const { id } = useParams();  // Extract id from URL params
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");  // Fixed syntax (added space after =)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        setError("User ID not provided");  // More specific message
        setLoading(false);
        return;
      }

      try {
        const required = await axios.get(`${import.meta.env.VITE_API_URL}/users/${id}`);
        setUser(required.data);
        console.log(required.data);
      } catch (err) {
        console.error(err);
        // Better error extraction: Use server message if available, fallback to generic
        setError(
          err.response?.data?.message || 
          err.message || 
          "Failed to fetch user. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);  // Dependency on id ensures refetch if id changes

  // Display loading spinner centered
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  // Display error with MUI Alert for better UX (instead of plain Typography)
  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Alert severity="error" sx={{ maxWidth: 400 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  // If no user (edge case after successful fetch), though unlikely
  if (!user) {
    return <Typography>User not found</Typography>;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight="bold">
          User Details
        </Typography>

        <Typography sx={{ mb: 1 }}>
          <b>ID:</b> {user._id}
        </Typography>
        <Typography sx={{ mb: 1 }}>
          <b>Name:</b> {user.fullName || "N/A"}  {/* Added fallback if fullName missing */}
        </Typography>
        <Typography sx={{ mb: 1 }}>
          <b>Email:</b> {user.email || "N/A"}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <b>Phone:</b> {user.phoneNumber || "N/A"}
        </Typography>

        <Button variant="contained" fullWidth onClick={() => navigate(-1)}>
          Back
        </Button>
      </Paper>
    </Box>
  );
};

export default GetAllUser;