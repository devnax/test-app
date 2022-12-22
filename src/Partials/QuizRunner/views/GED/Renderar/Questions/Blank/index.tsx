import React, { useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import { QuestionProps } from './types'
import reactStringReplace from 'react-string-replace';
import QuizHandler from '../../../../../handlers/QuizHandler';

import AnswerExplanationButton from '../../../components/AnswerExplanationButton'
import Typography from '@mui/material/Typography'
import parse, { domToReact } from 'html-react-parser';
import { noDispatch, withStore } from 'state-range'

import Anotation from '@src/Partials/QuizRunner/views/Anotation'


const Blank = (props: QuestionProps) => {
   const { data } = props
   const answer = QuizHandler.getQuestion(data.qid)
   const reportMode = QuizHandler.getMeta("reportMode")
   let answerValue = (answer?.value || []) as string[]
   const isIncorrect = reportMode && !answer?.correct || false

   const options = {
      replace: (domNode: any) => {
         if (domNode.type === 'text') {
            let idx = 0
            let replaced: any[] = reactStringReplace(domNode.data, /\$\((.*?)\)/gi, (match) => {
               let maxlength = 0;
               let split = match.split("|")
               split.forEach((value) => {
                  if (maxlength < value.length) {
                     maxlength = value.length
                  }
               })

               // const _answer = QuizHandler.getQuestion(data.qid)
               if (answer && !answer.loaded) {
                  if (!answer?.data.correctValues) {
                     (answer as any).data.correctValues = []
                  }
                  (answer as any).data.correctValues.push(split)
                  noDispatch(() => QuizHandler.update({ ...answer }, answer?._id))
               }

               const tmp = <input
                  key={match}
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  disabled={reportMode || false}
                  style={{
                     marginLeft: 4,
                     marginRight: 4,
                     border: '1px solid',
                     borderColor: isIncorrect ? "rgb(105, 11, 0)" : '#333',
                     textAlign: 'center',
                     width: maxlength * 15,
                     outline: "none",
                     background: isIncorrect ? "rgb(255 143 130)" : "#fff",
                     color: isIncorrect ? "rgb(105 11 0)" : "initial",
                  }}
                  data-index={idx}
                  value={answerValue[idx] || ""}
                  onChange={(e) => {
                     if (reportMode) return
                     const index = e.target.getAttribute("data-index")
                     index && (answerValue[parseInt(index)] = e.target.value)
                     answer && QuizHandler.update({ value: answerValue }, answer?._id)
                  }}
               />
               idx++
               return tmp
            }) as any

            for (let i = 0; i < replaced.length; i++) {
               if (typeof replaced[i] === 'string') {
                  replaced[i] = <Anotation
                     key={data.qid + i}
                     id={data.qid + i}
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


   useEffect(() => {
      if (answer) {
         !answer?.loaded && QuizHandler.update({ loaded: true }, answer?._id)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])


   return (
      <Stack
         color="#333"
         onClick={() => QuizHandler.activeQuestion(data.qid)}
      >
         <div
            dangerouslySetInnerHTML={{
               __html: data.questionContent
            }} />
         <Box>
            {parse(data.formate, options)}
         </Box>
         {
            isIncorrect && <Box mt={1}>
               <Stack spacing={1} display="inline-flex" bgcolor="#fafa94" p={1}>
                  <Typography variant="body1" ><b>{answer?.qindex}.</b> correct answers</Typography>
                  <Stack direction="row" spacing={1} >
                     {data.correctValues.map((v: any, idx) => <Chip key={idx} label={v.join('|')} />)}
                  </Stack>
                  <AnswerExplanationButton content={data.explanations.incorrect} />
               </Stack>
            </Box>
         }

      </Stack>
   )
}

export default withStore(Blank, (props) => {
   const { data } = props
   const answer = QuizHandler.getQuestion(data.qid)
   return [answer?.observe]
})