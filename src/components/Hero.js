import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { visuallyHidden } from '@mui/utils';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import "./styles/hero.css"
import cover from "./styles/images/cover.png";

const StyledBox = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: theme.shape.borderRadius,
  outline: '1px solid',
  boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
  backgroundImage: {cover},
  outlineColor: 'hsla(220, 25%, 80%, 0.5)',
  backgroundSize: 'cover',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
    backgroundImage: {cover},
    outlineColor: 'hsla(210, 100%, 80%, 0.1)',
  }),
}));

export default function Hero() {

  var navigate = useNavigate()

  return (
    <Box
      id="home"
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
        }),
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3rem, 10vw, 3.5rem)',
            }}
          >
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: 'inherit',
                color: 'primary.main',
                ...theme.applyStyles('dark', {
                  color: 'primary.light',
                }),
              })}
            >
              Distributed
            </Typography>
             Electronic Health Records
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '80%' },
            }}
          >
            Dehr allows users to store their electronic health records on their personal devices and share it with their
            healthcare practitioner using Peer-to-peer communication to enable a secure and eco-
            friendly approach to handle their data.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: '50%' } }}
          >
            <Button variant="contained" color="primary" fullWidth onClick={()=>{navigate("/doctor")}}>
              Live Demo
            </Button>
            <Button variant="outlined" color="primary" fullWidth onClick={()=>{window.location.href = "https://github.com/cenentury0941/dehr-hacknosis24"}}>
              Repository
            </Button>
          </Stack>
          <Typography variant="caption" sx={{ textAlign: 'center' }}>
            
          </Typography>
        </Stack>
        <StyledBox id="image">
          <div className='coverBg'></div>
          </StyledBox>
      </Container>
    </Box>
  );
}
