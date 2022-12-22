import React from 'react'
import { QuestionProps } from '../types'
import Stack from '@mui/material/Stack'
import ImageBox from './ImageBox'
import Normal from './Normal'
import { withStore } from 'state-range'
import QuizHandler from '@src/Partials/QuizRunner/handlers/QuizHandler'

const Option = (props: QuestionProps) => {
   const { data } = props
   const reportMode = QuizHandler.getMeta("reportMode")
   return (
      <Stack
         sx={{
            userSelect: "none",
            '& .drop-opt:hover': {
               border: reportMode ? "" : "2px solid blue",
            }
         }}
      >
         {
            data.type === "image" ? <ImageBox {...props} /> : <Normal {...props} />
         }
      </Stack>
   )
}

export default withStore(Option)