import React from 'react'
import Stack from '@mui/material/Stack'
import formulaIcon from '../Images/formula.png'
import formulaOnIcon from '../Images/formula_on.png'
import Button, { ButtonProps } from './ButtonBase'
import CalcRefView from '../ModalViews/CalcRef'
import Handler from "@src/Partials/QuizRunner/handlers/QuizHandler";

const CalcRefButton = (props: ButtonProps) => {
   return (
      <Stack
         border="1px solid #006DAA"
         p="5px 12px"
         bgcolor="#80AEE1"
      >
         <Button
            icon={formulaIcon.src}
            hoverIcon={formulaOnIcon.src}
            {...props}
            sx={{
               height: 26,
               pr: 0
            }}
            onClick={() => {
               Handler.setMeta("showModal", {
                  content: <CalcRefView />,
                  title: "Formula Sheet",
                  width: 900
               })
            }}
         >
            Calculator Reference
         </Button>
      </Stack>
   )
}

export default CalcRefButton