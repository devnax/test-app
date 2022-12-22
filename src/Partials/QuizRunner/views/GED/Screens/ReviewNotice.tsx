import React from 'react'
import Layout from '../Layout'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const ReviewNotice = () => {

   return (
      <Layout>
         <Stack mt={18} width="100%" textAlign="center">
            <Typography variant="body1" fontSize={17} color="initial" mb={1.5}>
               You will now have an oppurtunity to review the questions and your answers
            </Typography>
            <Typography variant="body1" fontSize={17} color="initial">
               <em>Click Next</em> to conitnue
            </Typography>
         </Stack>
      </Layout>
   )
}

export default ReviewNotice