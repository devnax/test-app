import * as React from 'react';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { alpha } from '@mui/material/styles';
import { useRouter } from 'next/router';
import ArrowRightIcon from '@mui/icons-material/ArrowRightAltRounded';


interface ItemProps {
   title: string;
   subtitle: string;
   slug: string;
}

const Item = ({ title, subtitle, slug }: ItemProps) => {
   const router = useRouter()

   return (
      <Grid item xs={12} md={6} p={1} >
         <Stack
            height={200}
            p={3}
            borderRadius={2}
            bgcolor="background.default"
            spacing={2}
            sx={{
               cursor: "pointer",
               transition: "all .3",
               "&:hover": {
                  bgcolor: t => alpha(t.palette.primary.main, .06),
                  '& h5, & p': {
                     color: "primary.main"
                  },
                  '& div': {
                     visibility: "visible!important"
                  }
               }
            }}
            onClick={() => {
               router.push(`/courses/${slug}`)
            }}
         >
            <Typography variant="h5" >{title}</Typography>
            <Typography variant="body2" fontWeight={400} >{subtitle}</Typography>
            <Stack direction="row" alignItems="center" justifyContent="flex-end" visibility="hidden">
               <ArrowRightIcon sx={{ color: "primary.main" }} />
            </Stack>
         </Stack>
      </Grid>

   )
}


const AdminssionSection = () => {

   return (
      <Stack
         minHeight={600}
         sx={{ bgcolor: 'background.paper' }}
         alignItems="center"
         justifyContent="center"
         py={10}
      >
         <Container >
            <Box mb={3}>
               <Typography variant="h2" >Admission Test</Typography>
               <Typography variant="body1" fontSize={16} my={1} mb={5}>Our course has been designed and optimised to help you self-study for the IBA - BBA/MBA admission test. This course is also useful if you are going to sit for the admission tests of private universities (like NSU, BRAC, IUB, AIUB, EWU). Our course is divided into four parts – English, Mathematics, Writing and Analytical Ability. </Typography>
            </Box>
            <Grid container spacing={3} alignItems="center">
               <Grid item xs={12} md={8} p={3}>
                  <Grid container >
                     <Item
                        title="BBA - IBA"
                        subtitle="Institute of Business Administration, University of Dhaka, uses a very unique admission process for selecting its BBA and MBA students."
                        slug="bba-iba"
                     />
                     <Item
                        title="MBA - IBA"
                        subtitle="Test yourself with five full-length mock tests for MBA-IBA."
                        slug="mba-iba"
                     />
                     <Item
                        title="BUP"
                        subtitle="Hello, and welcome to our E-Learning BUP Admission Course. We are thrilled by your interest in our program."
                        slug="bup"
                     />
                     <Item
                        title="University Admission Test"
                        subtitle="Our course has been designed and optimised to help you self-study for the Private University Admission test."
                        slug="university-admission"
                     />
                  </Grid>
               </Grid>
               <Grid item xs={12} md={4} p={3}>
                  <picture>
                     <img width="100%" src="/images/admission-test-home.png" alt="" />
                  </picture>
               </Grid>
            </Grid>
         </Container>
      </Stack>
   );
}


export default AdminssionSection