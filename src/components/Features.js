import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { Chip as MuiChip } from '@mui/material';
import Co2Icon from '@mui/icons-material/Co2';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import EdgesensorHighRoundedIcon from '@mui/icons-material/EdgesensorHighRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';

import {PeerReceiverHandler, PeerSenderHandler} from './PeerConnectionHandler';
import FileListItem from './FileListItem';
import ImageViewer from './ImageViewer';
import ResultText from './ResultText';
import { getCookieData } from '../utils/cookies';
import CarbonFootprintHandler from './CarbonFootprintHandler';
import CarbonImpactAnalysis from './CarbonImpactAnalysis';

const items = [
  {
    icon: <ViewQuiltRoundedIcon />,
    title: 'Receive Documents',
    description:
      'Receive documents from the patient\'s device',
    imageLight: 'url("/static/images/templates/templates-images/dash-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/dash-dark.png")',
  },
  {
    icon: <EdgesensorHighRoundedIcon />,
    title: 'Send Documents',
    description:
      'Generate and send documents to the patient',
    imageLight: 'url("/static/images/templates/templates-images/mobile-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/mobile-dark.png")',
  },
  {
    icon: <Co2Icon />,
    title: 'Carbon Footprint',
    description:
      'View your carbon footprint from the transactions on this device',
    imageLight: 'url("/static/images/templates/templates-images/mobile-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/mobile-dark.png")',
  },
];

const Chip = styled(MuiChip)(({ theme }) => ({
  variants: [
    {
      props: ({ selected }) => selected,
      style: {
        background:
          'linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))',
        color: 'hsl(0, 0%, 100%)',
        borderColor: theme.palette.primary.light,
        '& .MuiChip-label': {
          color: 'hsl(0, 0%, 100%)',
        },
        ...theme.applyStyles('dark', {
          borderColor: theme.palette.primary.dark,
        }),
      },
    },
  ],
}));

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const [receivedFiles, setReceivedFiles] = React.useState([])
  const [sentFiles, setSentFiles] = React.useState([])
  const [fileToSend, setFileToSend] = React.useState(null)
  const [selectedFile, setSelectedFile] = React.useState([])
  const [imageViewerData, setImageViewerData] = React.useState(null)
  const [impact, setImpact] = React.useState(null)
  
  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 2 },pt: { xs: 8, sm: 20 }, px: { xs: 2 , md: 12}, height: '95vh'}} maxWidth>
      <Grid container spacing={6} width={'100%'} sx={{ height: '100%' }}>

        <Grid item xs={12} md={4}>

          <div>
            <Typography component="h2" variant="h4" sx={{ color: 'text.primary' }}>
              Product features
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', mb: { xs: 2, sm: 4 } }}
            >
              Provide a brief overview of the key features of the product. For
              example, you could list the number of features, their types or
              benefits, and add-ons.
            </Typography>
          </div>
          
          <Stack
            direction="column"
            spacing={2}
            useFlexGap
            sx={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: '100%',
              display: { sm: 'flex' },
            }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Card
                key={index}
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={[
                  (theme) => ({
                    p: 3,
                    height: 'fit-content',
                    width: '100%',
                    background: 'none',
                    '&:hover': {
                      background:
                        'linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.5) 25%, hsla(210, 100%, 90%, 0.3) 100%)',
                      borderColor: 'primary.light',
                      boxShadow: '0px 2px 8px hsla(0, 0%, 0%, 0.1)',
                      ...theme.applyStyles('dark', {
                        background:
                          'linear-gradient(to right bottom, hsla(210, 100%, 12%, 0.2) 25%, hsla(210, 100%, 16%, 0.2) 100%)',
                        borderColor: 'primary.dark',
                        boxShadow: '0px 1px 8px hsla(210, 100%, 25%, 0.5) ',
                      }),
                    },
                  }),
                  selectedItemIndex === index &&
                    ((theme) => ({
                      backgroundColor: 'action.selected',
                      borderColor: 'primary.light',
                      ...theme.applyStyles('dark', {
                        borderColor: 'primary.dark',
                      }),
                    })),
                ]}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    textAlign: 'left',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { md: 'center' },
                    gap: 2.5,
                  }}
                >
                  <Box
                    sx={[
                      (theme) => ({
                        color: 'grey.400',
                        ...theme.applyStyles('dark', {
                          color: 'grey.600',
                        }),
                      }),
                      selectedItemIndex === index && {
                        color: 'primary.main',
                      },
                    ]}
                  >
                    {icon}
                  </Box>
                  <div>
                    <Typography
                      gutterBottom
                      sx={{ color: 'text.primary', fontWeight: 'medium' }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: 'text.secondary', mb: 1.5 }}
                    >
                      {description}
                    </Typography>
                    <Link
                      color="primary"
                      variant="body2"
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                      sx={{
                        fontWeight: 'bold',
                        display: 'inline-flex',
                        alignItems: 'center',
                        '& > svg': { transition: '0.2s' },
                        '&:hover > svg': { transform: 'translateX(2px)' },
                      }}
                    >
                      <span>Click here</span>
                      <ChevronRightRoundedIcon
                        fontSize="small"
                        sx={{ mt: '1px', ml: '2px' }}
                      />
                    </Link>
                  </div>
                </Box>
              </Card>
            ))}
          </Stack>

        </Grid>

        <Grid
          item
          xs={12}
          md={8}
          sx={{ display: 'flex', width: '100%', height: '100%' }}
        >


          <Card
            variant="outlined"
            sx={{
              height: '100%',
              width: '100%',
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              overflow: 'scroll'
            }}
          >
                      { selectedItemIndex == 0 && <PeerReceiverHandler receivedFiles={receivedFiles} setReceivedFiles={setReceivedFiles}/> }
                      {
                        selectedItemIndex == 0 && receivedFiles.map( (data) => { return <FileListItem file={data} setImageViewerData={setImageViewerData} setSelectedFile={setSelectedFile} /> } )
                      }
                      { selectedItemIndex == 1 && <PeerSenderHandler fileToSend={fileToSend} sentFiles={sentFiles} setSentFiles={setSentFiles} setFileToSend={setFileToSend}/>}
                      {
                        selectedItemIndex == 1 && sentFiles.map( (data) => { return <FileListItem file={data} setImageViewerData={setImageViewerData} setSelectedFile={setSelectedFile} /> } )
                      }
                      {
                        selectedItemIndex == 2 && <CarbonFootprintHandler setCarbonData={setImpact}/>
                      }
                      {
                        selectedItemIndex == 2 && <CarbonImpactAnalysis text={impact}/>
                      }
          </Card>

        </Grid>

      </Grid>
      { imageViewerData && <ImageViewer setImageViewerData={setImageViewerData} imageViewerData={imageViewerData} file={selectedFile} /> }
    </Container>
  );
}
