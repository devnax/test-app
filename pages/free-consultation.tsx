import type { NextPage } from 'next'
import Layout from '@src/Partials/Layout'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import ConsultationForm from '@contents/StudyAbroad/ConsultationForm'


const FreeConsultation: NextPage = () => {

   return (
      <Layout title="Free Consultation">
         <Stack p={4} bgcolor="background.default">
            <Container maxWidth="md">

               <Typography variant="body1" mb={2} sx={{ opacity: .9 }} textAlign="center">
                  We&apos;ll help you choose the perfect program and destination. We&apos;ll then talk about the best way to go about applying for that program. And then give you a quick summary of all the ways we can help you.
               </Typography>
            </Container>
         </Stack>

         <Stack bgcolor="background.paper">

            <Container sx={{ py: 4 }}>
               <Grid container alignItems="center">
                  <Grid item xs={12} md={6} p={2}>
                     <Stack>
                        <picture>
                           <img width="90%" src="/images/free-consultation.png" alt="Free Consultation" />
                        </picture>
                     </Stack>
                  </Grid>
                  <Grid item xs={12} md={6} p={2}>
                     <ConsultationForm />
                  </Grid>
               </Grid>
            </Container>
         </Stack>
      </Layout>
   )
}

export default FreeConsultation
