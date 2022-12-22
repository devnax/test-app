import React, { useEffect } from 'react'
import Stack from '@mui/material/Stack'
import { withStore } from 'state-range'
import HomeScreen from './Screens/Home'
import ListeningScreen from './Screens/Listening'
import InfoScreen from './Screens/Info'
import QuizScreen from './Screens/Quiz'
import ReportScreen from './Screens/Report'
import QuizHandler from "../../handlers/QuizHandler"
import useTimer from '@src/Partials/QuizRunner/helpers/useTimer'
import ResumeHandler from '../../handlers/ResumeHandler'
import ModalBase from './Layout/ModalBase'
import DialogBase from './Layout/DialogBase'
import LoadingDialog from './ModalViews/LoadingDialog'
import { initSpanContextMenu } from './Layout/ContextMenu'

const Render = () => {
   const quiz = QuizHandler.getQuizPost()
   const screen = QuizHandler.getMeta("screen")
   const activePage = QuizHandler.getMeta("activePage")
   const initialTime = QuizHandler.getMeta("initial_time") as number

   useTimer(quiz.id, initialTime, {
      onFinish: () => QuizHandler.finishQuiz(),
      onTick: () => QuizHandler.dispatch()
   })

   useEffect(() => {
      if (screen === 'quiz') {
         setTimeout(() => {
            initSpanContextMenu()
         }, 500);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [screen, activePage])

   useEffect(() => {
      ResumeHandler.set()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [QuizHandler.observeStoreData(), QuizHandler.observeStoreMeta()])

   useEffect(() => {
      if (QuizHandler.getMeta("loading")) {
         LoadingDialog()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [QuizHandler.getMeta("loading")])

   let screenView = <HomeScreen />
   switch (screen) {
      case "listening":
         screenView = <ListeningScreen />
         break;
      case "info":
         screenView = <InfoScreen />
         break;
      case "quiz":
         screenView = <QuizScreen />
         break;
   }
   return screenView
}


const IELTSQuiz = () => {
   const isFinshed = QuizHandler.getMeta("finished")
   const settings = QuizHandler.getMeta("settings")
   let tmp: any = null

   useEffect(() => {
      if (settings && !tmp && settings.template === "ielts") {
         LoadingDialog()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [tmp])

   if (!settings || settings.template !== "ielts") {
      return <></>
   }

   if (isFinshed) {
      tmp = <ReportScreen />
   } else if (settings) {
      tmp = <Render />
   }


   return <Stack
      height="100%"
      sx={{
         '& *': {
            fontFamily: "Arial,Helvetica,sans-serif, helvetica neue regular,helvetica neue,Roboto!important"
         },
         '& .katex': {
            userSelect: "none"
         },
         '& .katex *': {
            fontFamily: "KaTeX_Main, 'Times New Roman', serif!important"
         },
         '& span:hover .show-note': {
            display: "initial!important",
         }
      }}
   >
      {tmp}
      <ModalBase />
      <DialogBase />
   </Stack>
}

export default withStore(IELTSQuiz)