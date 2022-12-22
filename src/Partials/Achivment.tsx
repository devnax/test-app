import * as React from 'react';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'

interface AchivmentItemProps {
   label: string;
   value: string;
   icon: string;
}

const AchivmentItem = ({ label, value, icon }: AchivmentItemProps) => {
   return (
      <Grid item xs={12} md={6}>
         <Stack
            p={2}
            direction="row"
            alignItems="center"
            bgcolor="#30303a"
            spacing={4}
            borderRadius={2}
            height={100}
            sx={{
               '& svg': { color: "#fff", fontSize: 45 }
            }}
         >
            <Stack>
               <picture>
                  <img src={icon} alt={label} />
               </picture>
            </Stack>
            <Stack>
               <Typography
                  variant="h3"
                  fontWeight={500}
                  fontSize={{ xs: 25, md: 30, lg: 35 }}
                  color="#fff"
               >
                  {value}
               </Typography>
               <Typography
                  variant="h6"
                  fontWeight={400}
                  color="#fff"
                  sx={{ opacity: .7 }}
               >
                  {label}
               </Typography>
            </Stack>
         </Stack>
      </Grid>
   )
}


const Achivment = () => {

   return (
      <Stack
         sx={{
            bgcolor: '#121220',
            backgroundPosition: 'bottom',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundAttachment: "fixed",
            py: 15,
         }}
      >
         <Container >
            <Stack
               alignItems="center"
               spacing={2}
            >
               <Stack mb={4}>
                  <Typography
                     variant="h2"
                     textAlign="center"
                     fontWeight={200}
                     fontSize={{ xs: 30, md: 40, lg: 50 }}
                     color="#fff"
                     mb={2}
                  >
                     Achievements of PIE E-Learning
                  </Typography>

               </Stack>
               <Grid container spacing={3} maxWidth="md" justifyContent="center" alignItems="center" >
                  <AchivmentItem
                     label='Followers'
                     value="200k+"
                     icon="/images/earth.png"
                  />
                  <AchivmentItem
                     label='Students'
                     value="11k+"
                     icon="/images/students.png"
                  />
                  <AchivmentItem
                     label='Course Completed'
                     value="8k+"
                     icon="/images/completed.png"
                  />
                  <AchivmentItem
                     label='Certified Teachers'
                     value=" 100+"
                     icon="/images/teacher.png"
                  />
               </Grid>
            </Stack>
         </Container>
      </Stack>
   );
}


export default Achivment