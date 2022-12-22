import React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container/Container'




const TestCenter = () => {
   return (
      <Stack py={10} pt={3} bgcolor="background.default">
         <Container>
            <Grid container alignItems="center">
               <Grid item xs={12} md={7} p={5}>
                  <Typography variant="h2"
                     mb={2}>Social Impact</Typography>
                  <Stack spacing={2}>
                     <Typography variant="body1">
                        At PIE International Education, we thrive to create a significant impact on the society focusing on the Sustainable Development Goal 4: “Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all”  where we put quality education as our first priority.
                     </Typography>
                     <Typography variant="body1" >
                        Our vision is also aligned with SDG 8 : “Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all”, contributing to the economy maintaining ethical business practices with an aim of elevating the literacy rate of Bangladesh by providing quality education all over Bangladesh. We serve as a liaison creating a bridge between students who desire to study abroad & their country of choice by affiliating with globally renowned universities.
                     </Typography>

                  </Stack>
               </Grid>
               <Grid item xs={12} md={5} p={5}>
                  <picture>
                     <img width="100%" src="/images/social-impact.png" alt="Social Imapct" />
                  </picture>
               </Grid>
            </Grid>
         </Container>
      </Stack>
   )
}

export default TestCenter