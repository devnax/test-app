import React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import QuizHandler from "@src/Partials/QuizRunner/handlers/QuizHandler"
import { getTimer } from '@src/Partials/QuizRunner/helpers/useTimer'

const IELTSInfoScreen = () => {
   const quiz = QuizHandler.getQuizPost()
   const settings = QuizHandler.getSettings()
   const allQuestions = QuizHandler.findAll()
   const isReady = settings.isReadyMock
   const timer = getTimer(quiz.id)
   const time = timer?.getTime()
   const quizData = QuizHandler.getQuizData()
   const initial_time = QuizHandler.getMeta("initial_time")

   return (
      <Stack>
         <Typography fontWeight={600} fontSize="15pt" color="#313131" >{quiz.title}</Typography>
         {
            !!time && <Typography variant="body1" >Time: {(time.initialTime.milliseconds / 1000) / 60} minutes</Typography>
         }
         <Typography fontWeight={600} fontSize="15pt" color="#313131" mt={2}>INSTRUCTIONS TO CANDIDATES</Typography>

         <ul>
            <li>Answer&nbsp;<strong>all</strong>&nbsp;the questions.</li>
            <li>You can change your answers at any time during the test.</li>
         </ul>
         <Typography fontWeight={600} fontSize="15pt" color="#313131" mt={2}>INFORMATION FOR CANDIDATES</Typography>
         <ul>
            <li>There are {allQuestions.length} questions in this test.</li>
            {
               !settings.advanch_points.length && <li>Each question carries one mark.</li>
            }

            {
               isReady && <>
                  <li>There are {quizData.length} parts to the test</li>
                  {
                     quizData.length > 1 && <li>You will hear each part once.</li>
                  }
                  <li>For each part of the test there will be time for you to look through the questions and time for you to check your answers.</li>
               </>
            }
            {
               initial_time && <li>The test clock will show you when there are 10 minutes and 5 minutes remaining.</li>
            }
         </ul>

      </Stack>
   )
}

export default IELTSInfoScreen