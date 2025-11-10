import React from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const EditUser = () => {
  const navigate = useNavigate();
  const {id}= useParams()


  const [firstName, setFirstName] =useState('')
  const [lastName, setLastName] =useState('')
  const [email, setEmail] =useState('')
  const [Loading, setLoading] =useState(false)
  const [error, setError] =useState(false)

  
const payload ={firstName, lastName, email}
const handleEdit = async(event) => {
  event.preventDefault()
  setLoading(true)
  try {
    const res = await
    axios.put(`${import.meta.env.VITE_FRONTEND_URL}/api/auth/update${id}`,payload)
  console.log(Response)
  setLoading(false)
  navigate('/User')

  //setTimeout(() => navigate(-1), 1500)

}catch (error) {
  console.error(error)
  setError(error)
  setLoading(false)

 }

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
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Update User
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          Message goes here
        </Alert>

        <form onSubmit={handleEdit}>
        
        
          <TextField
            label="First Name"
            name="firstName"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
          <TextField label="Email" 
          name="email" 

          fullWidth margin="normal" />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={Loading}

          >
            {Loading ? <CircularProgress/> :'Update'}
            
          </Button>

          <Button variant="outlined" fullWidth sx={{ mt: 1 }}
            onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default EditUser;