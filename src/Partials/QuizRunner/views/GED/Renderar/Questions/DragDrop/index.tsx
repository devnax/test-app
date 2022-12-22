import React from 'react'
import Stack from '@mui/material/Stack'
import { QuestionProps } from './types'
import Box from './Box'
import Option from './Option'


const QuestionContainer = (props: QuestionProps) => {
   const { data } = props
   return (
      <Stack>
         {
            data.formate_type === 'box' ? <Box {...props} /> : <Option {...props} />
         }
      </Stack>
   )
}

export default QuestionContainer