import React from 'react'
import { QuestionProps } from '../types'
import Stack from '@mui/material/Stack'
import RenderBox from './RenderBox'

const Normal = (props: QuestionProps) => {
   const { data } = props
   return (
      <Stack
         spacing={1}
         direction={data.verticale_option ? "row" : "column"}
         flexWrap="wrap"

      >
         {
            data.items.map((item, idx) => <RenderBox key={idx} option={item} {...props} />)
         }
      </Stack>
   )
}

export default Normal