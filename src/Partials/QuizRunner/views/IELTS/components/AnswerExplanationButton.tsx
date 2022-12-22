import React from 'react'
import Box from '@mui/material/Box'
import Icon from '../Images/explanation.webp'
import Button from './ButtonBase'
import QuizHandler from "@src/Partials/QuizRunner/handlers/QuizHandler"
import ExplanationModal from '../ModalViews/ExplanationModal'

export interface QuestionProps {
   content: string
}

const AnswerExplanationButton = ({ content }: QuestionProps) => {
   const isReportMode = QuizHandler.getMeta("reportMode")
   if (!isReportMode || !content) {
      return <></>
   }

   return (
      <Box component="span">
         <Button
            icon={Icon.src}
            onClick={() => {
               QuizHandler.setMeta("showModal", {
                  content: <ExplanationModal content={content} />,
                  title: "Answer Explanation",
                  width: 350,
                  height: 450
               })
            }}
            sx={{
               backgroundSize: '20px!important',
               color: "blue"
            }}
         >
            Answer Explanation
         </Button>
      </Box>
   )
}

export default AnswerExplanationButton