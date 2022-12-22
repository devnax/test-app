import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Renderar from '../../'
import { QuestionProps } from './types'
import { withStore } from 'state-range'
import QuizHandler from '../../../../../handlers/QuizHandler'
import Anotation from '@src/Partials/QuizRunner/views/Anotation'


const ImageMap = (props: QuestionProps) => {
   const { data, childs } = props

   return <Stack spacing={2}>
      {data.questionContent && <Anotation id={data.uid} content={data.questionContent} />}
      <Box
         width={data.width}
         height={data.height}
         position="relative"
         sx={{
            backgroundImage: `url(${data.image_url})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain"
         }}
      >
         {
            childs.map((c, idx) => {
               const pos = data.fields[c.data.targetId]

               return <Box key={idx}
                  position="absolute"
                  {...pos}
               >
                  {
                     Renderar.render([c])
                  }
               </Box>
            })
         }
      </Box>
   </Stack>
}

export default withStore(ImageMap, (props: QuestionProps) => {
   return props.childs.map(c => {
      const q = QuizHandler.findFirst({ qid: c.data.qid })
      const activeQuestion = QuizHandler.getCurrentQuestion()
      return [q?.observe, activeQuestion]
   })
})