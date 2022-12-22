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
                     mb={2}>Company Portfolio</Typography>
                  <Stack spacing={2}>
                     <Typography variant="body1">
                        We are the pioneer of GED in Bangladesh since 2005 & have almost 313K students enrolled in our platform. We have successfully sent over 10K+ candidates abroad so far amongst which are currently residing in Malaysia, UK, Canada and in the US.
                     </Typography>
                     <Typography variant="body1" >
                        We have successfully partnered with IDP to expand our IELTS Test Prep and testing capabilities. PIE is also a partner of GED Testing Service (Pearson Holdings) – owners of the GED Test. We have two Pearson VUE Select Testing Sites which deliver tests for hundreds of testing clients like Microsoft, Cisco, PMI, Amazon, Oracle, Redhat, etc.
                     </Typography>
                     <Typography>
                        PIE has a sizable market share both in Test Prep as well as study-abroad since we retarget our in-house clientele from the above facilities.
                     </Typography>
                  </Stack>
               </Grid>
               <Grid item xs={12} md={5} p={5}>
                  <picture>
                     <img width="100%" src="/images/portfolio.png" alt="Company Portfolio" />
                  </picture>
               </Grid>
            </Grid>
         </Container>
      </Stack>
   )
}

export default TestCenter