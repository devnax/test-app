import React from 'react'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import CheckIcon from '@mui/icons-material/CheckRounded';


interface ItemProps {
   title: string;
}

const Item = ({ title }: ItemProps) => {
   return (
      <Stack
         direction="row"
         alignItems="center"
         spacing={2}
         p={1}
         borderRadius={2}
         bgcolor="background.paper"
      >
         <CheckIcon sx={{ color: "success.main" }} />
         <Typography variant="h6" >{title}</Typography>
      </Stack>
   )
}


const CanadaSection = () => {
   return (
      <Stack py={10} >
         <Container >
            <Typography variant="h2" fontSize={30} mb={6} textAlign="center">Services you will receive</Typography>

            <Grid container >
               <Grid item xs={12} md={6} p={2}>
                  <Typography variant="h4" mb={3}>The best study abroad experience</Typography>
                  <Typography variant="body2" fontSize={17} sx={{ opacity: .9 }}>
                     Our goal is to make the process of finding the perfect university for you as simple as possible. We want you to also know that your choice will benefit your family, your community, and your country.
                  </Typography>
               </Grid>
               <Grid item xs={12} md={6} p={2}>
                  <Stack spacing={1}>
                     <Item title="Spot Assessment" />
                     <Item title="Guaranteed Scholarship" />
                     <Item title="Support for Visa Processing" />
                     <Item title="No Service Charge" />
                     <Item title="Free File processing" />
                     <Item title="No Application Fee" />
                  </Stack>
               </Grid>
            </Grid>
         </Container>
      </Stack>
   )
}

export default CanadaSection