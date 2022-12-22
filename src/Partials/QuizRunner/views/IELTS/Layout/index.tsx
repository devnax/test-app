import React, { ReactElement } from 'react'
import Stack, { StackProps } from '@mui/material/Stack'
import Header from './Header'
import Footer from './Footer'
import Scrollbar from '@libs/Scrollbar'
import QuizHandler from "@src/Partials/QuizRunner/handlers/QuizHandler"
import Dropdown from '@src/libs/Dropdown'
import ContextMenu from './ContextMenu'
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export interface LayoutProps {
   children?: ReactElement | ReactElement[];
   containerProps?: StackProps
}



const page_ready_subtitle: any = {
   "READING AC": "Read the text below and answer question $ques",
   "READING GT": "Read the text below and answer question $ques",
   "LISTENING": "Listen and answer question $ques.",
   "WRITING AC": [
      "You should spend about 20 minutes on this task. Write at least 150 words.",
      "You should spend about 40 minutes on this task. Write at least 250 words."
   ],
   "WRITING GT": [
      "You should spend about 20 minutes on this task. Write at least 150 words.",
      "You should spend about 40 minutes on this task. Write at least 250 words."
   ]
}





const Layout = ({ children, containerProps }: LayoutProps) => {
   const theme = useTheme();
   const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
   const quiz = QuizHandler.getQuizPost()
   const screen = QuizHandler.getMeta("screen")
   const currentPage = QuizHandler.getMeta("activePage") as number
   const isQuizScreen = screen === 'quiz'
   const typo_theme: any = QuizHandler.getMeta("typography_setting")
   const settings = QuizHandler.getSettings()
   const quiz_type = settings.quiz_type.toUpperCase()
   const isReady = settings.isReadyMock

   let sx: any = {}
   if (typo_theme?.fontSize) {
      sx.fontSize = `${typo_theme?.fontSize}px!important`
   }
   if (typo_theme?.color) {
      sx.color = `${typo_theme?.color}!important`
   }

   let con_sx: any = {}
   if (screen === 'info' || screen === 'quiz') {
      con_sx = {
         bgcolor: "#dde3ee",
         boxShadow: "0 0.0714em 0.214em rgb(0 0 0 / 25%)"
      }
   }

   let subtitle = ""
   const pageQuestions = QuizHandler.find({ page: currentPage })
   if (pageQuestions.length) {
      const firstQ = pageQuestions[0]
      const lastQ = pageQuestions.length > 1 ? pageQuestions[pageQuestions.length - 1] : null

      const t = page_ready_subtitle[quiz_type]
      let q = firstQ.qindex + (lastQ ? " - " + lastQ.qindex : "")

      if (isReady && t) {
         if (Array.isArray(t)) {
            subtitle = t[currentPage]
         } else {
            subtitle = t
         }
         subtitle = subtitle.replace("$ques", q)
      } else {
         subtitle = `Question ${q}`
      }
   }


   return (
      <Stack
         height="100%"
         justifyContent="space-between"
         alignItems="center"
         bgcolor="#dce5f6"
      >
         <Header />
         <Stack
            width="100%"
            flex={1}
            height={`calc(100vh - ${isSmallScreen ? 200 : 115}px)`}
            bgcolor={typo_theme?.bgcolor}
            sx={{
               '& * p, & * div': {
                  ...sx
               }
            }}
            onContextMenu={(e: any) => {
               const sel: any = window.getSelection()
               if (sel.toString()) {
                  Dropdown.showContextMenu(e, <ContextMenu />)
               }
            }}
            {...containerProps}
            p="8px 16px"
         >
            {isQuizScreen && <Stack mt={.5} p={1} bgcolor="#fff" borderRadius={2} boxShadow={1} mb={1.5}>
               <Typography variant="h5" >{isReady ? "Part " + (currentPage + 1) : quiz.title}</Typography>
               <Typography variant="body1" fontWeight={600} fontSize={15}>{subtitle}</Typography>
            </Stack>}
            <Stack {...con_sx} borderRadius={2} overflow="hidden">
               <Scrollbar style={{ padding: 12 }}>
                  {children}
               </Scrollbar>
            </Stack>
         </Stack>
         {
            isQuizScreen && <Footer />
         }

      </Stack>
   )
}

export default Layout