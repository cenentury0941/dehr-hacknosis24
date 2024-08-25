import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: 'Local Data Storage',
    description:
      'Allows users to store Electronic Health Records (EHR) directly on their personal devices, eliminating the need for cloud-based solutions and reducing energy consumption.',
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: 'Peer-to-Peer Data Sharing',
    description:
      'Facilitates secure medical data transfer over a local area network via QR code, ensuring data privacy and efficiency without relying on external servers.',
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: 'AI-Driven Medical Summaries',
    description:
      'Uses artificial intelligence to summarize complex health data, helping patients better understand their medical information in a concise and digestible format.',
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: 'Carbon Footprint Tracking',
    description:
      'Provides users with real-time analytics on energy consumption and carbon footprint associated with data usage, raising awareness of the environmental impact of digital healthcare solutions.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Energy Consumption Projections',
    description:
      'Offers insights into the power consumption of medical data handling, enabling users to make more informed decisions to minimize their energy usage and environmental impact.',
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: 'QR Code Access Control',
    description:
      'Empowers patients and healthcare professionals to securely share and retrieve health records by scanning QR codes, streamlining the data-sharing process without external infrastructure.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="features"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: 'hsl(220, 30%, 2%)',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
            Features
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            Explore why DEHR stands out: adaptability, durability,
            user-friendly design, and innovation.
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  color: 'inherit',
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'hsla(220, 25%, 25%, .3)',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                  boxShadow: 'none',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
