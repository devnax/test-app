import React from 'react'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import QuizHandler from "@src/Partials/QuizRunner/handlers/QuizHandler"
import Layout from '../Layout'

// Images
import attentionIcon from '../Images/attention.webp'
import soundIcon from '../Images/sound.webp'
import ShadowButton from '../components/ShadowButton'
import AudioPlayer from '@src/Partials/QuizRunner/helpers/AudioPlayer'


const ListeningScreen = () => {

   const player = AudioPlayer("soundtrack", {
      sources: [process.env.NEXT_PUBLIC_HOME_URL + '/audio/soundcheck.mp3']
   })

   return (
      <Layout>
         <Stack
            height="100%"
            pt={20}
         >
            <Container maxWidth="lg">
               <Stack direction="row" alignItems="center" spacing={2}>
                  <picture>
                     <img src={soundIcon.src} alt="" />
                  </picture>
                  <Typography variant="h6" color="#000">Test sound</Typography>
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
                     mb={4}
                  >
                     <Typography color="#000">Put on your headphones and click the <b>Play sound</b> button to play a sample sound.</Typography>
                     <Stack direction="row" justifyContent="center" mt={3}>
                        <ShadowButton onClick={() => {
                           player.play()
                        }}>Play Sound</ShadowButton>
                     </Stack>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                     <Stack pt={1}>
                        <picture>
                           <img src={attentionIcon.src} alt="" />
                        </picture>
                     </Stack>
                     <Typography color="#000"> if you can not hear the sound clearly, please tell the invigilator.</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="center" >
                     <ShadowButton onClick={() => {
                        player.clear()
                        QuizHandler.setMeta("screen", "info")
                     }}>Continue</ShadowButton>
                  </Stack>
               </Stack>
            </Container>
         </Stack>
      </Layout>
   )
}

export default ListeningScreen