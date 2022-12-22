import React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TimeReminingButton from '../components/TimeReminingButton'
import QuestionButton from '../components/QuestionButton'
import CalculatorButton from '../components/CalculatorButton'
import HighlightButton from '../components/HighlightButton'
import FalgForReviewButton from '../components/FlagForReviewButton'
import InstructionButton from '../components/InstructionButton'
import QuizHandler from "@src/Partials/QuizRunner/handlers/QuizHandler"

const Header = () => {
   const quiz = QuizHandler.getQuizPost()
   const settings = QuizHandler.getSettings()
   const allQuestions = QuizHandler.findAll()
   const reportMode = QuizHandler.getMeta("reportMode")

   const screen = QuizHandler.getMeta("screen")
   const qindex = QuizHandler.getMeta("activeQuestion") as number
   const activeQuestion = QuizHandler.getCurrentQuestion()

   const auth = QuizHandler.getAuth()
   const isReady = settings.isReadyMock

   return (
      <Stack width="100%" sx={{ userSelect: "none" }}>
         <Stack
            height={45}
            bgcolor="#006DAA"
            color="#fff"
            px={1}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
         >
            <Typography variant="body1" >
               {
                  !isReady ? `${settings.course_type} ${quiz.title} - ` : `${settings.course_type} Ready® - ${settings.quiz_type} - `
               }
               {auth.firstname}
            </Typography>
            <Stack alignItems="flex-end" >
               {
                  !reportMode && <TimeReminingButton />
               }

               {
                  screen === 'quiz' && <QuestionButton from={qindex} to={allQuestions.length} />
               }
            </Stack>
         </Stack>
         <Stack
            height={35}
            bgcolor="#80AEE1"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            px={1}
         >
            {
               !reportMode && <>
                  {
                     screen === "quiz" && <>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                           <HighlightButton />
                           {
                              activeQuestion?.data.calculator && <CalculatorButton />
                           }
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                           <FalgForReviewButton />
                        </Stack>
                     </>
                  }
                  {
                     screen === 'review' && <>
                        <InstructionButton />
                     </>
                  }
               </>
            }

         </Stack>
      </Stack>
   )
}

export default Header