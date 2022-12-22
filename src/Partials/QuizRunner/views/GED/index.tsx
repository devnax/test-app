import React, { useEffect } from 'react'
import Stack from '@mui/material/Stack'
import { withStore } from 'state-range'
import HomeScreen from './Screens/Home'
import InfoScreen from './Screens/Info'
import QuizScreen from './Screens/Quiz'
import ReviewNoticeScreen from './Screens/ReviewNotice'
import ReviewScreen from './Screens/Review'
import ReportScreen from './Screens/Report'
import QuizHandler from "../../handlers/QuizHandler"
import useTimer from '@src/Partials/QuizRunner/helpers/useTimer'
import Loading from './Layout/Loading'
import ResumeHandler from '../../handlers/ResumeHandler'


const Render = () => {
   const quiz = QuizHandler.getQuizPost()
   const screen = QuizHandler.getMeta("screen")
   const initialTime = QuizHandler.getMeta("initial_time") as number

   useTimer(quiz.id, initialTime, {
      onFinish: () => QuizHandler.finishQuiz(),
      onTick: () => QuizHandler.dispatch()
   })

   useEffect(() => {
      ResumeHandler.set()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [QuizHandler.observeStoreData(), QuizHandler.observeStoreMeta()])

   let screenView = <HomeScreen />
   switch (screen) {
      case "info":
         screenView = <InfoScreen />
         break;
      case "quiz":
         screenView = <QuizScreen />
         break;
      case "review_notice":
         screenView = <ReviewNoticeScreen />
         break;
      case "review":
         screenView = <ReviewScreen />
         break;
   }
   return screenView
}


const GEDQuiz = () => {
   const isFinshed = QuizHandler.getMeta("finished")
   const settings = QuizHandler.getMeta("settings")

   if (!settings || settings.template !== "ged") {
      return <></>
   }

   let tmp = <Loading />

   if (isFinshed) {
      tmp = <ReportScreen />
   } else if (settings) {
      tmp = <Render />
   }

   return <Stack
      height="100%"
      sx={{
         '& *': {
            fontFamily: "Verdana, Geneva, sans-serif!important"
         },
         '& .katex': {
            userSelect: "none"
         },
         '& .katex *': {
            fontFamily: "KaTeX_Main, 'Times New Roman', serif!important"
         }
      }}
   >
      {tmp}
   </Stack>
}

export default withStore(GEDQuiz)