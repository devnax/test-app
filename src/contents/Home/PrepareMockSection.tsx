import * as React from 'react';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { alpha } from '@mui/material/styles'
import Link from 'next/link'
import Container from '@mui/material/Container'
import ArrowIcon from '@mui/icons-material/ArrowRightAltRounded';

interface ItemProps {
   label: string;
   value: string;
   color: string;
   slug: string;
}

const Item = ({ label, color, slug }: ItemProps) => {
   return (
      <Grid item xs={6} md={3}>
         <Link href={slug}>
            <Stack
               height={150}
               borderRadius={2}
               justifyContent="center"
               position="relative"
               sx={{
                  cursor: 'pointer',
                  transition: 'background .3s',
                  bgcolor: alpha(color, .1),
                  '&:hover': {
                     bgcolor: color,
                     color: "#fff",
                     border: 0,
                  },
                  '&:hover h4': { color: "#fff" },
                  '&:hover .right-arrow': {
                     visibility: "visible"
                  }
               }}
            >
               <Typography variant="h4" sx={{ color: color, textAlign: 'center', fontWeight: 800, fontSize: 30 }}>
                  {label}
               </Typography>
               <Stack
                  direction="row"
                  justifyContent="center"
                  visibility="hidden"
                  position="absolute"
                  left={0}
                  right={0}
                  bottom={0}
                  className="right-arrow"
               >
                  <Typography
                     variant="body1"
                     color="#fff"
                     fontSize={14}
                  >
                     Enroll Now
                  </Typography>
                  <ArrowIcon />
               </Stack>
            </Stack>
         </Link>
      </Grid >
   )
}



const PrepateMockSection = () => {

   return (
      <Stack bgcolor="background.default" py={15}>
         <Container maxWidth="md">
            <Typography
               variant="h2"
               textAlign="center"
               fontWeight={600}
               fontSize={40}
               mb={2}
            >
               Take Your Mock Test
            </Typography>
            <Typography
               variant="body2"
               textAlign="center"
               fontSize={17}
               mb={1}
            >
               PIE offer IELTS CBT, GED, SAT and GRE simulated user interface Mock Test. You can attend your online mock tests at any hour from the comfort of your own home. You can expect instant results whereas your writing assessment will be provided within 48 hours of the test.
            </Typography>
            <Grid container spacing={2} justifyContent="center" mt={3}>
               <Item
                  label="IELTS"
                  value="40+"
                  color="#D12F33"
                  slug="/courses/ielts-mock"
               />
               <Item
                  label="GED"
                  value="60+"
                  color="#007FA3"
                  slug="/courses/ged-mock"
               />
               <Item
                  label="SAT"
                  value="20+"
                  color="#0498DC"
                  slug="/courses/sat-mock"
               />
               <Item
                  label="GRE"
                  value="30+"
                  color="#014F8E"
                  slug="/courses/gre-mock"
               />
            </Grid>
         </Container>
      </Stack>
   );
}


export default PrepateMockSection