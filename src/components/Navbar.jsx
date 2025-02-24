import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              My App
            </Typography>
            {/* Esempio di un bottone in Navbar */}
            <Button color="inherit" component={Link} to="/">Home</Button>
            {/* <Button color="inherit" component={Link} to="/selfie">Selfie</Button> */}
            <Button color="inherit" component={Link} to="/gallery">Gallery</Button>
          </Toolbar>
        </AppBar>
  );
};

export default Navbar;