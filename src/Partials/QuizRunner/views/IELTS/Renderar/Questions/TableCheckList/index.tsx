import React from 'react'
import { QuestionProps } from './types'
import Stack from '@mui/material/Stack';
import Renderar from '../../'
import Anotation from '@src/Partials/QuizRunner/views/Anotation';

const Head = (props: QuestionProps) => {
   const { data } = props
   return <thead
      style={{
         background: "#c3d9ff"
      }}
   >
      <tr>
         <th></th>
         {
            data.headings.map((h, idx) => {
               return <th key={idx} align="center" style={{ fontWeight: 600, color: "#222" }}>{h.label}</th>
            })
         }
      </tr>
   </thead>
}


const QuestionContainer = (props: QuestionProps) => {
   const { data, childs } = props

   return (
      <Stack
         sx={{
            "& table, & th, & td": {
               border: 1,
               borderColor: "#444"
            },
            '& p': {
               m: 0
            }
         }}

         spacing={2}
      >
         {
            data.questionContent && <Anotation id={data.qid} content={data.questionContent} />
         }

         <table style={{ borderCollapse: "collapse" }}>
            <Head {...props} />
            <tbody>
               {
                  Renderar.render(childs)
               }
            </tbody>
         </table>
      </Stack>
   )
}

export default QuestionContainer