import type { NextPage } from 'next'
import Layout from '@src/Partials/Layout'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import BookFreeClassForm from '@contents/BookFreeClass/Form'


const BookFreeClass: NextPage = () => {

   return (
      <Layout title="Book Free Class">

         <Stack bgcolor="background.paper">
            <Container sx={{ py: 5 }}>
               <Grid container alignItems="center">
                  <Grid item xs={12} md={6} p={2}>
                     <Stack>
                        <picture>
                           <img width="90%" src="/images/free-class.png" alt="Free Class" />
                        </picture>
                     </Stack>
                  </Grid>
                  <Grid item xs={12} md={6} p={2}>
                     <BookFreeClassForm />
                  </Grid>
               </Grid>
            </Container>
         </Stack>
      </Layout>
   )
}

export default BookFreeClass
