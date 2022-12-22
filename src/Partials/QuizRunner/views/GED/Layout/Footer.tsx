import React from 'react'
import Stack from '@mui/material/Stack'
import QuizHandler from "@src/Partials/QuizRunner/handlers/QuizHandler"
import NextButton from '../components/NextButton'
import EndTestButton from '../components/EndTestButton'
import NavigationButton from '../components/NavigationButton'
import PrevButton from '../components/PrevButton'
import EndReviewButton from '../components/EndReviewButton'
import ReviewAllButton from '../components/ReviewAllButton'
import ReviewUnansweredButton from '../components/ReviewUnansweredButton'
import ReviewFlaggedButton from '../components/ReviewFlaggedButton'
import ReviewScreenButton from '../components/ReviewScreenButton'
import RsultScreenButton from '../components/ResultScreenButton'


const InfoFooter = () => {
   return (
      <>
         <Stack></Stack>
         <Stack >
            <NextButton
               onClick={() => {
                  QuizHandler.startQuiz()
               }}
            />
         </Stack>
      </>
   )
}

const QuizFooter = () => {
   const quizData = QuizHandler.getQuizData()
   const settings = QuizHandler.getSettings()
   const allQuestions = QuizHandler.findAll()
   const flagedQuestions = QuizHandler.find({ flagged: true })
   const unansweredQuestions = QuizHandler.find({ value: null })
   const reviewMode = QuizHandler.getMeta("reviewMode")
   const reportMode = QuizHandler.getMeta("reportMode")
   const currentIndex = QuizHandler.getMeta("activeQuestion") as number

   let questions = allQuestions
   if (reviewMode === 'flagged') {
      questions = flagedQuestions
   } else if (reviewMode === 'unanswered') {
      questions = unansweredQuestions
   }


   return (
      <>
         <Stack>

            {
               reportMode ? <RsultScreenButton /> : <>
                  {
                     reviewMode ? <ReviewScreenButton
                        onClick={() => {
                           QuizHandler.setMeta("screen", "review")
                        }}
                     /> : <>

                        {
                           !settings.isReadyMock && <EndTestButton
                              onClick={() => {
                                 QuizHandler.setMeta("screen", "review_notice")
                              }}
                           />
                        }
                     </>
                  }
               </>
            }

         </Stack>
         <Stack direction="row">
            {
               currentIndex > 1 && <PrevButton
                  onClick={() => {

                     for (let i = 0; i < questions.length; i++) {
                        let question = questions[i]
                        if (question.qindex === currentIndex) {
                           const nextQuestion = questions[i - 1]
                           if (nextQuestion && quizData[nextQuestion.page]) {
                              QuizHandler.setMeta("activePage", nextQuestion.page)
                              QuizHandler.setMeta("activeQuestion", nextQuestion.qindex)
                              !reportMode && QuizHandler.update({ seen: true }, nextQuestion._id)
                           }
                           break;
                        }
                     }
                  }}
               />
            }

            {
               !reviewMode && <NavigationButton />
            }
            <NextButton
               onClick={() => {
                  let found = false;
                  for (let i = 0; i < questions.length; i++) {
                     let question = questions[i]
                     if (question.qindex === currentIndex) {
                        const nextQuestion = questions[i + 1]
                        if (nextQuestion && quizData[nextQuestion.page]) {
                           QuizHandler.setMeta("activePage", nextQuestion.page)
                           QuizHandler.setMeta("activeQuestion", nextQuestion.qindex)
                           !reportMode && QuizHandler.update({ seen: true }, nextQuestion._id)
                           found = true
                        }
                        break;
                     }
                  }

                  if (!found) {
                     if (reportMode) {
                        QuizHandler.reset()
                        QuizHandler.setMeta("finished", true)
                     } else {
                        QuizHandler.setMeta("screen", reviewMode ? "review" : "review_notice")
                     }
                  }

               }}
            />
         </Stack>
      </>
   )
}

const ReviewNoticeFooter = () => {
   return (
      <>
         <Stack>
         </Stack>
         <Stack direction="row">
            <PrevButton
               onClick={() => {
                  QuizHandler.setMeta("screen", "quiz")
               }}
            />
            <NavigationButton />
            <NextButton
               onClick={() => {
                  QuizHandler.setMeta("screen", "review")
                  QuizHandler.setMeta("reviewMode", "all")
               }}
            />
         </Stack>
      </>
   )
}

const ReviewFooter = () => {

   return (
      <>
         <Stack>
            <EndReviewButton />
         </Stack>
         <Stack direction="row">
            <ReviewAllButton
               onClick={() => {
                  const questions = QuizHandler.findAll()
                  if (questions.length) {
                     QuizHandler.setMeta("activeQuestion", questions[0].qindex)
                     QuizHandler.setMeta("reviewMode", "all")
                     QuizHandler.setMeta("screen", "quiz")
                  }
               }}
            />
            <ReviewUnansweredButton
               onClick={() => {
                  const questions = QuizHandler.find({ value: null })
                  if (questions.length) {
                     QuizHandler.setMeta("activeQuestion", questions[0].qindex)
                     QuizHandler.setMeta("reviewMode", "unanswered")
                     QuizHandler.setMeta("screen", "quiz")
                  }
               }}
            />
            <ReviewFlaggedButton
               onClick={() => {
                  const questions = QuizHandler.find({ flagged: true })
                  if (questions.length) {
                     QuizHandler.setMeta("activeQuestion", questions[0].qindex)
                     QuizHandler.setMeta("reviewMode", "flagged")
                     QuizHandler.setMeta("screen", "quiz")
                  }
               }}
            />
         </Stack>
      </>
   )
}


const Footer = () => {
   const screen = QuizHandler.getMeta("screen")
   let tmp: any = ''

   switch (screen) {
      case "info":
         tmp = <InfoFooter />
         break;
      case "quiz":
         tmp = <QuizFooter />
         break;
      case "review_notice":
         tmp = <ReviewNoticeFooter />
         break;
      case "review":
         tmp = <ReviewFooter />
         break;
   }

   return (
      <Stack
         width="100%"
         height={35}
         bgcolor="#006DAA"
         direction="row"
         justifyContent="space-between"
         alignItems="center"
      >
         {tmp}
      </Stack>
   )
}

export default Footer