import React from 'react';
import { Routes, Route } from 'react-router-dom';
//import { Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SelfiePage from './pages/SelfiePage';
import GalleryPage from './pages/GalleryPage';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Personalizza il colore principale
    },
  },
});

const App = () => {
  return (
    <div>
       <ThemeProvider theme={theme}>
       <Navbar />
              <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/selfie" element={<SelfiePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;
