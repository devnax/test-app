import type { NextPage } from 'next'
import Layout from '@src/Partials/Layout'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import AddressSection from '@contents/Contact/AddressSection'
import ContactForm from '@contents/Contact/ContactForm'


const ContactUs: NextPage = () => {

   return (
      <Layout title="Contact Us">
         <AddressSection />
         <Stack
            bgcolor="background.paper"
            py={10}
         >
            <Container >
               <Grid container alignItems="center">
                  <Grid item xs={12} md={6} p={2}>
                     <Stack>
                        <picture>
                           <img width="90%" src="/images/contact-us.png" alt="Free Class" />
                        </picture>
                     </Stack>
                  </Grid>
                  <Grid item xs={12} md={6} p={2}>
                     <ContactForm />
                  </Grid>
               </Grid>
            </Container>
         </Stack>
      </Layout>
   )
}

export default ContactUs
