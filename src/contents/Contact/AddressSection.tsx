import React from 'react'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import ArrowRightIcon from '@mui/icons-material/ArrowRightAltRounded';



interface AddressCardProps {
   title: string;
   address: string;
   phone: string;
   mapLink: string;
}

const AddressCard = ({ title, address, phone, mapLink }: AddressCardProps) => {
   return (
      <Grid item xs={12} md={6} p={1}>
         <Stack
            p={2}
            borderRadius={2}
            bgcolor="background.paper"
            height={160}
         >
            <Typography variant="h6" mb={2}>{title}</Typography>
            <Stack spacing={1}>
               <Stack direction="row" alignItems="center" spacing={2}>
                  <Stack width={30}>
                     <picture>
                        <img width={25} src="/images/address.png" alt="" />
                     </picture>
                  </Stack>
                  <Link
                     underline='none'
                     target="_blank"
                     href={mapLink}
                  >{address}</Link>
               </Stack>
               <Stack direction="row" alignItems="center" spacing={2}>
                  <Stack width={30}>
                     <picture>
                        <img width={25} src="/images/phone-call.png" alt="" />
                     </picture>
                  </Stack>
                  <Link
                     underline='none'
                     href={`tel:${phone}`}
                  >{phone}</Link>
               </Stack>
            </Stack>
         </Stack>
      </Grid>
   )
}


const AddressSection = () => {
   return (
      <Stack sx={{ py: 10 }}>
         <Container maxWidth="md">
            <Stack
               mb={4}
               borderRadius={2}
               p={3}
               bgcolor="#121220"
               direction="row"
               sx={{
                  cursor: 'pointer',
                  "&:hover": {
                     bgcolor: "#30303a"
                  }
               }}
               onClick={() => {
                  window.location.href = "mailto:help@piebd.com";
               }}
               alignItems="center"
            >
               <Stack direction="row" alignItems="center" flex={1}>
                  <Stack width={80}>
                     <picture>
                        <img width={50} src="/images/email.png" alt="mail" />
                     </picture>
                  </Stack>
                  <Stack>
                     <Typography variant="h4" color="#fff">Mail Us</Typography>
                     <Link
                        underline="none"
                        href="mailto:help@piebd.com"
                        fontSize={20}
                        color="#00e8d3"
                     >help@piebd.com</Link>
                  </Stack>
               </Stack>
               <Stack>
                  <ArrowRightIcon sx={{ fontSize: 40, color: "#fff" }} />
               </Stack>
            </Stack>


            <Grid container >
               <AddressCard
                  title="Dhanmondi"
                  phone="+88 01407054460"
                  address='House 58, Road 3/A, Satmasjid Road, Dhanmondi'
                  mapLink='https://goo.gl/maps/Vtn1jkn1NT7ZvjgQ9'
               />
               <AddressCard
                  title="Banani"
                  phone="+88 01922031196"
                  address='House 114, Road 12, Block E, Banani​'
                  mapLink='https://goo.gl/maps/X59V4XZvq1gNk6vK8'
               />
               <AddressCard
                  title="Uttara"
                  address='House 10, Gausul Azam Ave, Sector 13, Uttara​'
                  phone="+88 01979102222"
                  mapLink='https://goo.gl/maps/jbk94myBJLv6MX148'
               />
               <AddressCard
                  title="Siddeshwari"
                  address='40,41 siddheshwari circular road , Dhaka 1217'
                  phone="+880 1407054469"
                  mapLink='https://goo.gl/maps/qLh92ufRNW9Y4h6L9'
               />
            </Grid>
         </Container>
      </Stack>
   )
}

export default AddressSection