import React from 'react'
import instructionIcon from '../Images/instruction.png'
import instructionOnIcon from '../Images/instruction_on.png'
import Button, { ButtonProps } from './ButtonBase'
import Handler from "@src/Partials/QuizRunner/handlers/QuizHandler";
import InstructionModal from '../ModalViews/InstructionModal'

const ReviewFlagged = (props: ButtonProps) => {
   return (
      <Button
         icon={instructionIcon.src}
         hoverIcon={instructionOnIcon.src}
         {...props}
         onClick={() => {
            Handler.setMeta("showModal", {
               content: <InstructionModal />,
               title: "Review Instruction",
               width: 800,
               height: 350,
               draggable: false
            })
         }}
      >
         Instructors
      </Button>
   )
}

export default ReviewFlagged