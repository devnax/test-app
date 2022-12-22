import React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container/Container'



const Overview = () => {
   return (
      <Stack py={10} pt={3} bgcolor="background.default">
         <Container>
            <Grid container alignItems="center">
               <Grid item xs={12} md={5} p={5}>
                  <picture>
                     <img width="100%" src="/images/corporate-mission.png" alt="Corporate Mission" />
                  </picture>
               </Grid>
               <Grid item xs={12} md={7} p={5}>
                  <Typography variant="h2" mb={2}>Corporate Mission, Vision & Values</Typography>
                  <Stack spacing={2}>
                     <Stack>
                        <Typography fontWeight={600}>Mission Statement</Typography>
                        <Typography> We thrive to become the Largest Education Consultant in Bangladesh by creating a bridge between students & their dreams.</Typography>
                     </Stack>
                     <Stack>
                        <Typography fontWeight={600}>The Great Vision</Typography>
                        <Typography> By 2030, We aspire wants to become the Largest E-Learning platform in Bangladesh creating an ecosystem where we will help you to SEE, VISUALISE, PROCESS and finally LIVE  your dreams.</Typography>
                     </Stack>
                     <Stack>
                        <Typography fontWeight={600}>Tagline</Typography>
                        <Typography>Your Personal Education Consultant!</Typography>
                     </Stack>
                     <Stack>
                        <Typography fontWeight={600}>Core Values</Typography>
                        <ul>
                           <li>Integrity</li>
                           <li>Transparency</li>
                           <li>Put Your Clients First</li>
                           <li>Responsibility</li>
                           <li>Excellence</li>
                           <li>Community</li>
                        </ul>
                     </Stack>
                  </Stack>
               </Grid>

            </Grid>
         </Container>
      </Stack>
   )
}

export default Overview