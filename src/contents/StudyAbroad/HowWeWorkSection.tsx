import React from 'react'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'


const CanadaSection = () => {
   return (
      <Stack py={10} bgcolor="background.paper">
         <Container >
            <Stack>
               <Typography variant="h2" fontSize={30} mb={2} textAlign="center">How can we help?</Typography>

            </Stack>
            <Stack>
               <picture>
                  <img width="100%" src="/images/howwework.png" alt="HOW WE WORK" />
               </picture>
            </Stack>
         </Container>
      </Stack>
   )
}

export default CanadaSection