import React from 'react'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'



interface ItemProps {
   title: string
}

const Item = ({ title }: ItemProps) => {
   return (
      <Grid item xs={12} md={4} p={1}>
         <Stack
            bgcolor="#30303a"
            p={4}
            borderRadius={2}
         >
            <Typography variant="h6" color="#fff">{title}</Typography>
         </Stack>
      </Grid>
   )
}


const AvailableSection = () => {
   return (
      <Stack py={15} bgcolor="#fff">
         <Container maxWidth="md">
            <Stack>
               <Typography variant="h2" fontSize={30} mb={4}>Available Courses</Typography>
               <Grid container>
                  <Item
                     title="Diploma Program"
                  />
                  <Item
                     title="Adv. Diploma Program"
                  />
                  <Item
                     title="Foundation Program"
                  />
                  <Item
                     title="International Year one"
                  />
                  <Item
                     title="Undergrad Program"
                  />
                  <Item
                     title="Master's Program"
                  />
               </Grid>
            </Stack>
         </Container>
      </Stack>
   )
}

export default AvailableSection