import React, { useEffect, useState, useRef } from 'react'
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


const Input = (props: QuestionProps & { idx: number, maxlength: number }) => {
   const ref: any = useRef()
   const [focused, setFocused] = useState(false)
   const { data, idx, maxlength } = props
   const currentQuestion = QuizHandler.getMeta("activeQuestion")
   const answer = QuizHandler.getQuestion(data.qid)
   const reportMode = QuizHandler.getMeta("reportMode")
   let answerValue = (answer?.value || []) as string[]
   const isIncorrect = reportMode && !answer?.correct || false
   const qindex = answer?.qindex || ""
   const placeholder = qindex + (idx ? `.${idx}` : "")
   const val = answerValue[idx]

   useEffect(() => {
      if (ref && currentQuestion === qindex && idx === 0) {
         ref.current.focus()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [currentQuestion])

   return (
      <input
         ref={ref as any}
         spellCheck={false}
         autoComplete="off"
         autoCorrect="off"
         placeholder={focused ? "" : placeholder}
         disabled={reportMode || false}
         onFocus={() => setFocused(true)}
         onBlur={() => setFocused(false)}
         style={{
            marginLeft: 4,
            marginRight: 4,
            border: '1px solid',
            borderColor: focused ? "#000" : (isIncorrect ? "rgb(105, 11, 0)" : '#0370a7'),
            textAlign: 'center',
            width: maxlength * 15,
            height: 21,
            lineHeight: "20px",
            outline: "none",
            background: isIncorrect ? "rgb(255 143 130)" : "#fff",
            color: isIncorrect ? "rgb(105 11 0)" : "initial",
            borderRadius: "2.3px",
            padding: "1px",
            fontWeight: 700,
            fontSize: '16px',
            boxShadow: focused ? "0 0 0 1px #333" : "none",
            backgroundColor: focused ? "#ddf3fd" : "",
         }}
         data-index={idx}
         value={val || ""}
         onChange={(e) => {
            if (reportMode) return
            const index = e.target.getAttribute("data-index")
            index && (answerValue[parseInt(index)] = e.target.value)
            answer && QuizHandler.update({ value: answerValue }, answer?._id)
         }}
      />
   )
}

const Blank = (props: QuestionProps) => {
   const { data } = props
   const answer = QuizHandler.getQuestion(data.qid)
   const reportMode = QuizHandler.getMeta("reportMode")
   const isIncorrect = reportMode && !answer?.correct || false

   const options = {
      replace: (domNode: any) => {
         if (domNode.type === 'text') {
            let idx = 0
            const replaced: any[] = reactStringReplace(domNode.data, /\$\((.*?)\)/gi, (match) => {
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
               const tmp = <Input
                  key={match}
                  {...props}
                  idx={idx}
                  maxlength={maxlength}
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
         id={"q" + answer?.qindex}
         color="#333"
         onClick={() => QuizHandler.activeQuestion(data.qid)}
         sx={{
            '& p': {
               m: 0
            }
         }}
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
   return [answer?.observe, QuizHandler.getCurrentQuestion()]
})