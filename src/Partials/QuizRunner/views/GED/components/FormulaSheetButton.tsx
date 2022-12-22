import React from 'react'
import Stack from '@mui/material/Stack'
import formulaIcon from '../Images/formula.png'
import formulaOnIcon from '../Images/formula_on.png'
import Button from './ButtonBase'
import QuizHandler from "@src/Partials/QuizRunner/handlers/QuizHandler";
import FormulaSheetView from '../ModalViews/FormulaSheet'

const FormulaSheetButton = () => {
   return (
      <Stack
         border="1px solid #006DAA"
         p="5px 12px"
         bgcolor="#80AEE1"
      >
         <Button
            icon={formulaIcon.src}
            hoverIcon={formulaOnIcon.src}
            sx={{
               height: 26,
               pr: 0
            }}
            onClick={() => {
               QuizHandler.setMeta("showModal", {
                  content: <FormulaSheetView />,
                  title: "Formula Sheet",
                  width: 900,
                  height: 600
               })
            }}
         >
            Formula Sheet
         </Button>
      </Stack>
   )
}

export default FormulaSheetButton