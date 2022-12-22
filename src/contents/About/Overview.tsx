import React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'


const Overview = () => {
   return (
      <Stack py={10} pt={3} bgcolor="background.paper">
         <Container>
            <Grid container alignItems="center">
               <Grid item xs={12} md={7} p={5}>
                  <Typography variant="body1" >
                     PIE International Education is the country’s leading education platform to provide international education consultancy which comprises counseling services to the students, preparing them for higher education & ensuring a smooth transition process for Study Abroad. PIE International Education is the very first of its kind to introduce e-learning platform in the country providing ease & convenience to the students for self learning. PIE started its journey in 2005, and since then it has established itself as a renowned brand in American High School DIploma (GED), standardized Test Prep (IELTS, SAT, GRE, etc.), Testing Center and Study Abroad. PIE provides a one-stop solution for IELTS Test Prep students, beginning from test prep and testing facilities to study abroad counseling and placement.
                  </Typography>
               </Grid>
               <Grid item xs={12} md={5} p={5}>
                  <picture>
                     <img width="100%" src="/images/about-us.png" alt="About PIE" />
                  </picture>
               </Grid>
            </Grid>
         </Container>
      </Stack>
   )
}

export default Overview