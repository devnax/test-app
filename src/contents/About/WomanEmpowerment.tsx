import React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container/Container'




const WomanEmpowerment = () => {
   return (
      <Stack py={10} pt={3} bgcolor="background.paper">
         <Container>
            <Grid container alignItems="center">
               <Grid item xs={12} md={5} p={5}>
                  <picture>
                     <img width="100%" src="/images/woman-empowermen.png" alt="Woman Empowerment" />
                  </picture>
               </Grid>
               <Grid item xs={12} md={7} p={5}>
                  <Typography variant="h2"
                     mb={2}>Woman Empowerment</Typography>
                  <Stack spacing={2}>
                     <Typography variant="body1">
                        At PIE International Education, women represent 40% of the workforce. PIE thrives on making women realise their own worth by adding to their self esteem and self-confidence. Once women are financially independent they are able to spend on their needs and wants and equally contribute to the country’s Gross Domestic Product (GDP). Empowering women would also lead to optimized utilization of resources as resources are fairly distributed meeting the SDG Goal 5 :“Achieve gender equality and empower all women and girls”
                     </Typography>
                  </Stack>
               </Grid>

            </Grid>
         </Container>
      </Stack>
   )
}

export default WomanEmpowerment