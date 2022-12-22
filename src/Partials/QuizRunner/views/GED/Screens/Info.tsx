import React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Layout from '../Layout'
// Images
import PIELogo from '../Images/pielogo.webp'
import GEDLogo from '../Images/ged-logo.webp'
import QuizHandler from "@src/Partials/QuizRunner/handlers/QuizHandler"

import SATInfoScreen from '../../InfoContent/SAT'


const GEDInfo = () => {
   const settings = QuizHandler.getSettings()
   const allQuestions = QuizHandler.findAll()
   const isReady = settings.isReadyMock

   return <Stack>
      {!isReady && <Typography variant="body1" color="#222" fontWeight={600}>
         Total Questions: {allQuestions.length}
      </Typography>}
   </Stack>
}

const InfoScreen = () => {
   const quiz = QuizHandler.getQuizPost()
   const settings = QuizHandler.getSettings()
   const auth = QuizHandler.getAuth()
   const isReady = settings.isReadyMock
   let logo = PIELogo.src
   if (isReady && settings.course_type === 'GED') {
      logo = GEDLogo.src
   }
   const course_type = settings.course_type
   const infoContent = settings.information
   let infoTmp = <GEDInfo />
   switch (course_type) {
      case "SAT":
         infoTmp = <SATInfoScreen />
         break;
   }

   return (
      <Layout >
         <Stack
            alignItems="center"
            justifyContent="center"
            maxWidth={1280}
            width="100%"
            m="auto"
         >
            <Stack mt={6}>
               <picture>
                  <img src={logo} alt="" />
               </picture>
            </Stack>
            <Typography fontWeight="bold" fontSize={"15pt"} color="#222" mt={4}>{quiz.title}</Typography>
            <Stack width="100%" mt={3}>
               <Typography variant="body1" color="#222" mb={1}>
                  Welcome, <b>{auth.firstname}</b>
               </Typography>
            </Stack>
            <Stack width="100%">

               {
                  infoContent ? <div dangerouslySetInnerHTML={{ __html: infoContent }} /> : infoTmp
               }

               <Typography variant="body1" color="#222" mt={6} textAlign="center">
                  Click the <em>Next button</em> in the lower right corner in the screen to begin.
               </Typography>
            </Stack>

         </Stack>

      </Layout>
   )
}

export default InfoScreen