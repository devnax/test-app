import React from 'react'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import QuizHandler from "@src/Partials/QuizRunner/handlers/QuizHandler"
import Layout from '../Layout'
// Images
import informationIcon from '../Images/information.webp'
import userCheckIcon from '../Images/userCheck.png'
import ShadowButton from '../components/ShadowButton'


const HomeScreen = () => {

   const auth = QuizHandler.getAuth()

   return (
      <Layout>
         <Stack
            height="100%"
            pt={25}
         >
            <Container maxWidth="lg">
               <Stack direction="row" alignItems="center" spacing={2}>
                  <picture>
                     <img src={userCheckIcon.src} alt="" />
                  </picture>
                  <Typography variant="h6" color="#000">Confirm your details</Typography>
               </Stack>
               <Stack
                  mt={1}
                  borderRadius={3}
                  border={1}
                  borderColor="#fff"
                  p={5}
               >
                  <Stack
                     color="#000"
                     mb={2}
                  >
                     <ul>
                        <li>Name: {auth.firstname}</li>
                        <li>Email: {auth.email}</li>
                     </ul>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1} mb={4}>
                     <picture>
                        <img src={informationIcon.src} alt="" />
                     </picture>
                     <Typography variant="body1" color="#000">If your details aren&apos;t correct, please inform the invigilator.</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="center" >
                     <ShadowButton
                        onClick={() => {
                           QuizHandler.setMeta("screen", "listening")
                        }}
                     >My details are correct</ShadowButton>
                  </Stack>
               </Stack>
            </Container>
         </Stack>
      </Layout>
   )
}

export default HomeScreen