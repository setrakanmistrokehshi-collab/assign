import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { IconButton } from '@mui/material';  // Assuming MUI for icons; remove if not using MUI
import MenuIcon from '@mui/icons-material/Menu';  // Hamburger icon
import CloseIcon from '@mui/icons-material/Close';
import './Nav.css';  // Keep your existing CSS, but add the responsive styles below

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);  // State for mobile menu toggle

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='nav' style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}>  {/* Fixed to top */}
      <div className="logo">
        <strong>SETRAKAN</strong>
      </div>

      {/* Hamburger icon for mobile */}
      <IconButton className="menu-toggle" onClick={toggleMenu} sx={{ display: { xs: 'block', md: 'none' } }}>
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>

      {/* Links - Show full on desktop, toggle on mobile */}
      <div className={`links ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={toggleMenu}>Home</Link>  {/* Close menu on click for mobile */}
        <Link to="/UserList" onClick={toggleMenu}>Users</Link>
        <Link to="/login" onClick={toggleMenu}>Login</Link>  {/* Fixed path case */}
        <Link to="/register" onClick={toggleMenu}>Sign up</Link>
        <Link to="/User" onClick={toggleMenu}>Userlist</Link>  {/* Assuming this is correct; might be duplicate */}
        <Link to="/User/edit/:id" onClick={toggleMenu}>EditUser</Link>  {/* Note: :id is placeholder; use dynamic if needed */}
      </div>
    </div>
  );
};

export default Nav;