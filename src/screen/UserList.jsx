import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Delete } from "@mui/icons-material";

const UsersList = () => {
  
  const navigate = useNavigate();
  const [Users, setUsers] = useState([])
  const [Loading, setLoading] = useState(true)
  const [Error, setError] = useState('')
  const api = 'https://students-learning-api.onrender.com/api/auth/'
  useEffect(() =>{
    const fetchUsers = async ( )=>{
        try { 
            setLoading(true)
            const res = await axios.get(api)
            console.log(res.data)
            setUsers(res.data)
            setLoading(false)
        }catch (error) {
            console.error(error)
            setError(error)
            setLoading(false)
        }
    }
    fetchUsers()

  },[] )

  // {loading $$ <CircularProgress />}
  if (Loading) return 
   <CircularProgress size={100} color="white" thickness={4}  item/>

      
  const deleteUser = async (_id) =>{
    const confirm = window.confirm('Are you sure you want to delete This user?')
    if (!confirm) return;

    try {
        await axios.delete(`https://fullstack-student-backend.onrender.com/api/auth/update/${_id}`)

    }catch (error) {
        console.error(error)
        alert('Failed to delete this User')
    }
  }

 
  

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        All Registered Users
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>ID</b>
              </TableCell>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Email</b>
              </TableCell>
              <TableCell align="center">
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Users.length > 0 ? (
              Users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => navigate(`/User/${user._id}`)}
                      >
                        View
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => navigate(`/User/edit/${user._id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
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
  );
};

export default UsersList;