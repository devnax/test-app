/* eslint-disable @next/next/no-img-element */
import React from 'react'
import calculatorIcon from '../Images/calculator.png'
import Button from './ButtonBase'
import Calculator from '../ModalViews/Calculator'
import QuizHandler from "@src/Partials/QuizRunner/handlers/QuizHandler";
import Stack from '@mui/material/Stack'


const CalculatorButton = () => {
   const qindex = QuizHandler.getMeta("activeQuestion") as number
   const answer = QuizHandler.findFirst({ qindex })
   if (!answer || !answer.data.calculator) {
      return <></>
   }

   return (
      <Stack px={1}>
         <Button
            onClick={() => {
               QuizHandler.setMeta("showModal", {
                  content: <Calculator />,
                  title: "Calculator",
                  width: 310,
                  height: 660
               })
            }}
            sx={{
               width: 30,
               height: 30,
               borderRadius: 30,
               bgcolor: '#6aade4',
               p: 0
            }}
         >
            <img src={calculatorIcon.src} alt="" width="20px" />
         </Button>
      </Stack>
   )
}

export default CalculatorButton