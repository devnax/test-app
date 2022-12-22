import React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase'
import QuizHandler from "@src/Partials/QuizRunner/handlers/QuizHandler"

// Images
import PIELogo from '../Images/pielogo.webp'
import GEDLogo from '../Images/ged-logo.webp'
import StartBtnLogo from '../Images/start-btn.png'
import StartBtnHoverLogo from '../Images/start-btn-hover.png'
import ExitBtnLogo from '../Images/exit-btn.png'
import ExitBtnHoverLogo from '../Images/exit-btn-hover.png'
import { getFullscreen } from '@src/Partials/QuizRunner/helpers/useFullscreen'

const HomeScreen = () => {
   const fullscreen = getFullscreen("quiz")
   const quiz = QuizHandler.getQuizPost()
   const settings = QuizHandler.getSettings()
   const isReady = settings.isReadyMock
   let logo = PIELogo.src
   if (isReady && settings.course_type === 'GED') {
      logo = GEDLogo.src
   }

   return (
      <Stack
         height="100%"
         sx={{
            background: "radial-gradient(circle, rgba(255,255,255,1) 8%, rgba(185,229,224,1) 35%, rgba(185,229,228,1) 100%)"
         }}
         alignItems="center"
         justifyContent="center"
      >
         <Stack
            alignItems="center"
            maxWidth={1024}
            width="100%"
         >
            <picture>
               <img src={logo} alt="" />
            </picture>

            <Stack alignItems="center" mt={4}>
               <Typography
                  variant="h1"
                  color="#1da2a1"
                  fontSize="25pt"
                  fontWeight="normal"
                  textTransform="uppercase"
               >
                  {
                     !isReady ? `${settings.course_type} PRACTICE LESSON ON ${settings.quiz_type}` : `THE ${settings.course_type}® TEST ON COMPUTER`
                  }
               </Typography>
               <Typography
                  variant="h1"
                  color="#017ba2"
                  fontSize="20pt"
                  fontWeight="normal"
                  mt={3}
               >
                  {
                     quiz.title
                  }
               </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" width="100%" mt={12}>
               <ButtonBase
                  disableRipple
                  sx={{
                     mt: 9,
                     width: 80,
                     height: 47,
                     backgroundImage: `url(${ExitBtnLogo.src})`,
                     backgroundRepeat: "no-repeat",
                     backgroundSize: "contained",
                     backgroundPosition: "center",
                     '&:hover': {
                        backgroundImage: `url(${ExitBtnHoverLogo.src})`,
                     }
                  }}
                  onClick={() => {
                     QuizHandler.deleteAll()
                     fullscreen && fullscreen.exit()
                  }}
               >

               </ButtonBase>
               <ButtonBase
                  disableRipple
                  sx={{
                     width: 120,
                     height: 47,
                     backgroundImage: `url(${StartBtnLogo.src})`,
                     backgroundRepeat: "no-repeat",
                     backgroundSize: "contained",
                     backgroundPosition: "center",
                     '&:hover': {
                        backgroundImage: `url(${StartBtnHoverLogo.src})`,
                     }
                  }}
                  onClick={() => {
                     QuizHandler.setMeta("screen", "info")
                  }}
               ></ButtonBase>
            </Stack>
         </Stack>
      </Stack>
   )
}

export default HomeScreen