import React from 'react'
import reactStringReplace from 'react-string-replace';
import { QuestionProps } from "./types";
import Renderar from '../../'
import parse, { domToReact } from 'html-react-parser';
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Anotation from '@src/Partials/QuizRunner/views/Anotation';
import QuizHandler from '@src/Partials/QuizRunner/handlers/QuizHandler';
import { withStore } from 'state-range';

const FreeChoice = (props: QuestionProps) => {
   const { data, childs } = props
   const options = {
      replace: (domNode: any) => {
         if (domNode.type === 'text') {
            let idx = 0
            const replaced: any[] = reactStringReplace(domNode.data, /\$\((.*?)\)/gi, () => {
               let tmp = Renderar.render([childs[idx]])
               idx++
               return <Box px={1} key={idx}>{tmp}</Box>
            }) as any
            for (let i = 0; i < replaced.length; i++) {
               if (typeof replaced[i] === 'string') {
                  replaced[i] = <Anotation
                     key={data.uid + i}
                     id={data.uid + i}
                     content={replaced[i]}
                  />
               }
            }
            return <Stack direction="row" alignItems="center" flexWrap="wrap">{replaced}</Stack>
         } else if (domNode.name === 'p') {
            return <div>{domToReact(domNode.children, options)}</div>
         }
      }
   }

   return (
      <div>
         {parse(data.questionContent, options)}
      </div>
   )
}

export default withStore(FreeChoice, ({ childs }) => {
   const observe = []
   for (let child of childs) {
      const ans = QuizHandler.findFirst({ qid: child.data.qid })
      if (ans) {
         observe.push(ans.observe)
      }
   }

   return observe
})