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
               <Grid item xs={12} md={5} p={5}>
                  <picture>
                     <img width="100%" src="/images/test-center.png" alt="Test Center" />
                  </picture>
               </Grid>
               <Grid item xs={12} md={7} p={5}>
                  <Typography variant="h2"
                     mb={2}
                  >Test Center</Typography>
                  <Stack spacing={2}>
                     <Typography variant="body1" >
                        We have partnered with globally renowned Pearson Vue to undertake exams on their behalf. We have almost 500+ different certificate examinations  in our portfolio. We have also partnered with IDP to undertake IELTS Examinations of around 5000 students per year. We have a space of approximate 10000 sqft. allotted for examination centres where we offer State-of-the-Art facilities with well equipped & latest technology.
                     </Typography>
                  </Stack>
               </Grid>

            </Grid>
         </Container>
      </Stack>
   )
}

export default TestCenter