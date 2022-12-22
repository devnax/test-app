import React from 'react'
import calculatorIcon from '../Images/calculator.png'
import calculatorOnIcon from '../Images/calculator_on.png'
import Button from './ButtonBase'
import Calculator from '../ModalViews/Calculator'
import Handler from "@src/Partials/QuizRunner/handlers/QuizHandler";

const CalculatorButton = () => {
   return (
      <Button
         icon={calculatorIcon.src}
         hoverIcon={calculatorOnIcon.src}
         onClick={() => {
            Handler.setMeta("showModal", {
               content: <Calculator />,
               title: "Calculator",
               width: 310,
               height: 660
            })
         }}
      >
         calculator
      </Button>
   )
}

export default CalculatorButton