import React from 'react'
import { QuestionProps } from '../types'
import Stack from '@mui/material/Stack'
import ImageBox from './ImageBox'
import Normal from './Normal'
import { withStore } from 'state-range'

const Option = (props: QuestionProps) => {
   const { data } = props
   return (
      <Stack
         sx={{
            userSelect: "none",
         }}
      >
         {
            data.type === "image" ? <ImageBox {...props} /> : <Normal {...props} />
         }
      </Stack>
   )
}

export default withStore(Option)