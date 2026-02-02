import React from 'react';
import LoginPage from "./screen/LoginPage";
import Home from './screen/Home';
import { Routes, Route, useLocation } from "react-router-dom";
import Registeration from "./screen/Registeration";
import UsersList from './screen/UserList';
import EditUser from "../src/screen/EditUser";
import GetUser from "../src/screen/GetUser";
import { AuthProvider } from "./context/AuthContext";
import { Box, Typography, Link } from '@mui/material';  // Assuming MUI is used; remove if not and style with CSS
import Nav from './component/Nav';
// Footer Component (new)
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#06fa64cb',  // Light gray background
        padding: '20px',
        textAlign: 'bottom',
        position: 'fixed',  // u
        // se 'fixed' if you want it stuck to bottom
        bottom: 0,
        width: '100%',
        height: '250px',
        paddingTop: '60px',
        borderTop: '1px solid #0c0b0b',
        textAlignLast: 'center',

        mt: 4,  // Margin top for spacing from content
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Setrakan. All rights reserved.
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Link href="/about" sx={{ mx: 1, textDecoration: 'none', color: 'white' }}>About Us</Link>
        <Link href="/privacy" sx={{ mx: 1, textDecoration: 'none', color: 'white' }}>Privacy Policy</Link>
        <Link href="/terms" sx={{ mx: 1, textDecoration: 'none', color: 'white' }}>Terms of Service</Link>
        <Link href="/contact" sx={{ mx: 1, textDecoration: 'none', color: 'white' }}>Contact Us</Link>
      </Box>
    </Box>
  );
};

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Nav />
        <MainRoutes />
      </AuthProvider>
    </div>
  );
};

// Separate component to use useLocation hook inside Router
const MainRoutes = () => {
  const location = useLocation();
  const noFooterPaths = ['/login', '/register'];  // Exclude these paths

  const showFooter = !noFooterPaths.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<Registeration />} />
        <Route path='/UsersList' element={<UsersList />} />
        <Route path='/Users/:id' element={<GetUser />} />
        <Route path='/Users/edit/:id' element={<EditUser />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
};

export default App;