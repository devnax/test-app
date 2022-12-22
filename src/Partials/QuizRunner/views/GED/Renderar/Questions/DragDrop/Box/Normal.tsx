import React from 'react'
import { QuestionProps } from '../types'
import Stack from '@mui/material/Stack'
import RenderBox from './RenderBox'


const Normal = (props: QuestionProps) => {
   const { data } = props

   return (
      <Stack
         sx={{
            '&  > div:hover': {
               borderColor: "blue!important"
            }
         }}
      >
         {
            data.items.map((item, idx) => <RenderBox key={idx} box={item} {...props} />)
         }
      </Stack>
   )
}

export default Normal