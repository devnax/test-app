import React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Layout from '../Layout'
import infoIcon from '../Images/info-blue.png'
import QuizHandler from "@src/Partials/QuizRunner/handlers/QuizHandler"
import ShadowButton from '../components/ShadowButton'
import IELTSInfoScreen from '../../InfoContent/IELTS'
import SATInfoScreen from '../../InfoContent/SAT'

const InfoScreen = () => {
   const settings = QuizHandler.getSettings()
   const course_type = settings.course_type
   const infoContent = settings.information

   let infoTmp = <IELTSInfoScreen />
   switch (course_type) {
      case "SAT":
         infoTmp = <SATInfoScreen />
         break;
   }

   return (
      <Layout >
         <Stack
            width="100%"
            color="#222"

            borderRadius={2}
            p={3}
            mt={3}
         >
            {
               infoContent ? <div dangerouslySetInnerHTML={{ __html: infoContent }} /> : infoTmp
            }

            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} mb={1}>
               <Stack pt={.6} >
                  <picture>
                     <img src={infoIcon.src} alt="" />
                  </picture>
               </Stack>
               <Typography fontWeight={600} fontSize={14} color="#575757" >Click &apos;Start test&apos; to begin</Typography>
            </Stack>

            <Stack direction="row" justifyContent="center">
               <ShadowButton
                  onClick={() => {
                     QuizHandler.startQuiz()
                  }}
               >Start test</ShadowButton>
            </Stack>
         </Stack>

      </Layout>
   )
}

export default InfoScreen