import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ────────────────────────────────────────────────
//               Validation Schema
// ────────────────────────────────────────────────
const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long"),

  lastName: yup
    .string()
    .trim()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name is too long"),

  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .trim(),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[^A-Za-z0-9]/, "Must contain at least one special character"),

  // Optional: add password confirmation
  // confirmPassword: yup
  //   .string()
  //   .oneOf([yup.ref("password")], "Passwords must match")
  //   .required("Please confirm your password"),

  phoneNumber: yup
    .string()
    .trim()
    .matches(/^\+?\d{9,15}$/, "Please enter a valid phone number (9–15 digits)"),

  address: yup.string().trim().max(200, "Address is too long"),
});

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onChange", // better real-time feedback
  });

  const onSubmit = async (data) => {
    setApiError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        data,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 1000, // prevent hanging forever
        }
      );

      // Optional: show success message / auto-login
      // alert("Registration successful! Please log in.");
      reset(); // clear form
      navigate("/login", { replace: true });

    } catch (err) {
      console.error("Registration error:", err);

      let message = "Registration failed. Please try again later.";

      if (err.response) {
        // Server responded with error (4xx, 5xx)
        const { status, data } = err.response;

        if (status === 400) {
          message = data?.message || "Invalid information provided.";
        } else if (status === 409) {
          message = data?.message || "Email is already registered.";
        } else if (status === 429) {
          message = "Too many attempts. Please try again later.";
        } else if (status >= 500) {
          message = "Server error. Please try again later.";
        } else {
          message = data?.message || `Error ${status}`;
        }
      } else if (err.request) {
        // No response received (network issue, CORS, timeout...)
        message = "Cannot connect to the server. Check your internet connection.";
      }

      setApiError(message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1565c0, #42a5f5)",
        p: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, sm: 4 },
            width: { xs: "100%", sm: 420 },
            borderRadius: 4,
            maxWidth: 460,
          }}
        >
          <Typography variant="h5" component="h1" textAlign="center" mb={3}>
            Create Account
          </Typography>

          {apiError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {apiError}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="First Name"
              fullWidth
              {...register("firstName")}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              sx={{ mb: 2.5 }}
            />

            <TextField
              label="Last Name"
              fullWidth
              {...register("lastName")}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              sx={{ mb: 2.5 }}
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ mb: 2.5 }}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{ mb: 2.5 }}
            />

            {/* Uncomment if you want password confirmation */}
            { <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              sx={{ mb: 2.5 }}
            /> }

            <TextField
              label="Phone Number (optional)"
              type="tel"
              fullWidth
              {...register("phoneNumber")}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message || "e.g. +2348012345678"}
              sx={{ mb: 2.5 }}
            />

            <TextField
              label="Address (optional)"
              fullWidth
              {...register("address")}
              error={!!errors.address}
              helperText={errors.address?.message}
              multiline
              rows={2}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              disabled={isSubmitting}
              variant="contained"
              size="large"
              sx={{ py: 1.5, textTransform: "none", fontSize: "1.1rem" }}
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={24} color="inherit" sx={{ mr: 1.5 }} />
                  Creating account...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>

          <Typography variant="body2" mt={3} textAlign="center" color="text.secondary">
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none", fontWeight: 500 }}>
              Sign in
            </Link>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default RegistrationForm;