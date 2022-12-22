import React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import LoadIELTSQuiz from './views/IELTS'
import LoadGEDQuiz from './views/GED'
import { Post } from '@src/Routers';
import { useFullscreen } from './helpers/useFullscreen';
import QuizHandler from './handlers/QuizHandler'
import Alert from '@src/libs/Alert'
import ResumeHandler from './handlers/ResumeHandler'
import { QuizSettingsProps } from './types'
import { ReportFactoryProps } from './handlers/ReportFactory'
import Auth from '@src/System/Auth'


interface Props {
   quiz: Post & {
      quiz_data: {
         quiz: {
            data: any[];
            settings: QuizSettingsProps
         },
         total_question: number;
      },
      quiz_reports?: ReportFactoryProps[]
   },
   courseId: number
}

const QuizMainContainer = (props: Props) => {
   const fullscreen = useFullscreen("quiz")
   const q = props.quiz
   const limit = props.quiz?.quiz_data?.quiz?.settings.resticted_limit

   if (!Auth.isAdmin() && q.quiz_reports && q.quiz_reports.length >= limit) {
      return <></>
   }


   return (
      <Stack
         height="100%"
         color="#333"
      >
         {
            fullscreen.active && <Stack
               tabIndex={0}
               height="100%"
               width="100%"
               bgcolor="background.paper"
               position="fixed"
               top={0}
               left={0}
               bottom={0}
               zIndex={999999}
               display={"block"}
               sx={{
                  userSelect: "none"
               }}
               onContextMenu={(e) => {
                  e.preventDefault()
               }}
            >
               <LoadIELTSQuiz />
               <LoadGEDQuiz />
            </Stack>
         }

         <Button
            variant="contained"
            onClick={() => {
               const has = ResumeHandler.has(props.quiz.id)
               if (has) {
                  Alert.open('quiz', {
                     title: "Resume Your Test",
                     content: "Would you like to resume where you left off?",
                     type: "warning",
                     onClick: (is: boolean) => {
                        if (is) {
                           QuizHandler.loadQuiz(props.quiz)
                           QuizHandler.setMeta("courseId", props.courseId)
                           fullscreen.open()
                           setTimeout(() => {
                              ResumeHandler.load(props.quiz.id)
                              QuizHandler.startQuiz()
                           }, 100);
                        } else {
                           ResumeHandler.remove(props.quiz.id)
                           QuizHandler.loadQuiz(props.quiz)
                           QuizHandler.setMeta("courseId", props.courseId)
                           fullscreen.open()
                        }
                     }
                  }, { opacity: 1, })
               } else {
                  QuizHandler.loadQuiz(props.quiz)
                  QuizHandler.setMeta("courseId", props.courseId)
                  fullscreen.open()
               }
            }}
         >
            Start Quiz
         </Button>
      </Stack>
   )
}

export default QuizMainContainer