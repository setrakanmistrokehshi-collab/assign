
import React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';  // Or use XIcon if available
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';  // Optional: Add more as needed

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#4caf50',  // Green background
        padding: '20px',
        textAlign: 'center',
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        borderTop: '1px solid #388e3c',  // Darker green border for contrast
        zIndex: 1000,
      }}
    >
      <Typography variant="body2" color="white">  {/* White text for contrast */}
        © {new Date().getFullYear()} Setrakan. All rights reserved.
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Link href="/about" sx={{ mx: 1, textDecoration: 'none', color: 'white' }}>About Us</Link>
        <Link href="/privacy" sx={{ mx: 1, textDecoration: 'none', color: 'white' }}>Privacy Policy</Link>
        <Link href="/terms" sx={{ mx: 1, textDecoration: 'none', color: 'white' }}>Terms of Service</Link>
        <Link href="/contact" sx={{ mx: 1, textDecoration: 'none', color: 'white' }}>Contact Us</Link>
      </Box>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>  {/* Social media links */}
        <IconButton href="https://facebook.com" target="_blank" sx={{ color: 'white', mx: 1 }}>
          <FacebookIcon />
        </IconButton>
        <IconButton href="https://twitter.com" target="_blank" sx={{ color: 'white', mx: 1 }}>
          <TwitterIcon />
        </IconButton>
        <IconButton href="https://instagram.com" target="_blank" sx={{ color: 'white', mx: 1 }}>
          <InstagramIcon />
        </IconButton>
        <IconButton href="https://linkedin.com" target="_blank" sx={{ color: 'white', mx: 1 }}>
          <LinkedInIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;