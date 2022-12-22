import React from 'react'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import ArrowRightIcon from '@mui/icons-material/ArrowRightAltRounded';
import Link from 'next/link'


const Scholarship = () => {
   return (
      <Stack py={15}>
         <Container >
            <Grid container alignItems="center">
               <Grid item xs={12} md={6} p={2}>
                  <picture>
                     <img width="100%" src="/images/schollarship.png" alt="scholarship" />
                  </picture>
               </Grid>
               <Grid item xs={12} md={6} p={2}>
                  <Stack spacing={3} >
                     <Typography variant="h2" >Study Abroad with Scholarship</Typography>
                     <Typography variant="body2" fontSize={18} >Join the Biggest education fest with PIE at 4 of our branches from 11 am to 5 pm every day! The Education Fest is an opportunity for you to personally experience the best of education. Everyone who is serious about studying at an International University for a great career growth can visit us. Just click the button to book your FREE Counselling allocation.</Typography>
                     <Stack direction="row" alignItems="center" >
                        <Link href="/free-consultation">
                           <Button
                              variant="contained"
                              size="large"
                              endIcon={<ArrowRightIcon />}
                              href="/free-consultation"
                           >
                              Get Started
                           </Button>
                        </Link>
                     </Stack>
                  </Stack>
               </Grid>
            </Grid>

         </Container>
      </Stack>
   )
}

export default Scholarship