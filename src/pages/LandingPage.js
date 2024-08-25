import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import AppAppBar from '../components/AppAppBar';
import Hero from '../components/Hero';
import Highlights from '../components/Highlights';
import About from '../components/FAQ';
import getLPTheme from './getLPTheme';
import MobileOnly from './MobileOnly';
import Features from '../components/Features';

export default function LandingPage() {

  const LPtheme = createTheme(getLPTheme('light'));
  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <AppAppBar mode={'light'} toggleColorMode={()=>{}} />
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Divider />
        <Highlights/>
        <Divider />
        <About />
      </Box>
    </ThemeProvider>
  );
}
