import React, { ReactElement } from 'react'
import Stack, { StackProps } from '@mui/material/Stack'
import Header from './Header'
import Footer from './Footer'
import Scrollbar from '@libs/Scrollbar'
import FormulaSheetButton from '../components/FormulaSheetButton'
import CalcRefButton from '../components/CalcRefButton'
import QuizHandler from "@src/Partials/QuizRunner/handlers/QuizHandler"
import ModalView from './ModalBase'

export interface LayoutProps {
   children?: ReactElement | ReactElement[];
   containerProps?: StackProps
}

const Layout = ({ children, containerProps }: LayoutProps) => {
   const isQuizScreen = QuizHandler.getMeta("screen")
   const activeQuestion = QuizHandler.getCurrentQuestion()

   return (
      <Stack
         height="100%"
         justifyContent="space-between"
         alignItems="center"
      >
         <Header />
         <Stack
            width="100%"
            flex={1}
            bgcolor="#fff"
            height="calc(100vh - 115px)"
            {...containerProps}
         >
            <Scrollbar
               style={{
                  padding: "8px 24px"
               }}
            >
               {
                  isQuizScreen === 'quiz' && <Stack width="100%" mb={2} mt={2} direction="row" justifyContent="space-between" alignItems="center">
                     <FormulaSheetButton />
                     {
                        activeQuestion?.data.calculator && <CalcRefButton />
                     }
                  </Stack>
               }
               {children}
            </Scrollbar>
         </Stack>
         <Footer />
         <ModalView />
      </Stack>
   )
}

export default Layout