import React, { useEffect, useRef } from 'react'
import Stack from '@mui/material/Stack'
import { QuestionProps } from './types'
import useUndo from "@src/Partials/QuizRunner/helpers/useUndo"
import QuizHandler from '@src/Partials/QuizRunner/handlers/QuizHandler'
import Typography from '@mui/material/Typography'
import { withStore } from 'state-range'
import Anotation from '@src/Partials/QuizRunner/views/Anotation'

const QuestionContainer = (props: QuestionProps) => {
   const { data } = props
   const inputRef: any = useRef()
   const undoHandler = useUndo()
   const answer = QuizHandler.getQuestion(data.qid)
   const isActive = QuizHandler.getMeta("activeQuestion") === answer?.qindex
   const reportMode = QuizHandler.getMeta("reportMode")

   useEffect(() => {
      if (answer) {
         !answer?.loaded && QuizHandler.update({ loaded: true }, answer?._id)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   useEffect(() => {
      if (!reportMode && inputRef && isActive) {
         inputRef.current.focus()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   if (!answer) {
      return <>Invalid Question</>
   }

   const val: string = answer.value || ""

   return (
      <Stack id={"q" + answer.qindex} onClick={() => QuizHandler.activeQuestion(data.qid)} sx={{
         '& p': {
            m: 0
         }
      }}>
         {
            data.questionContent && <Anotation id={data.qid} content={data.questionContent} />
         }

         <Stack>
            <textarea
               disabled={reportMode || false}
               ref={inputRef}
               style={{
                  border: "1px solid #0370a7 ",
                  maxWidth: "100%",
                  width: '100%',
                  resize: "vertical",
                  fontSize: 16,
                  padding: 6,
                  borderRadius: '0.143em',
                  minHeight: 700
               }}
               value={val}
               onChange={(e) => {
                  if (reportMode) return
                  QuizHandler.update({ value: e.target.value }, answer._id)
                  undoHandler.add(e.target.value)
               }}
            />
            <Typography variant="body1" color="#333">Word count: {val ? val.trim().replace(/  +/g, ' ').split(" ").length : 0}</Typography>
         </Stack>
      </Stack>
   )
}

export default withStore(QuestionContainer, ({ data }) => {
   const answer = QuizHandler.getQuestion(data.qid)
   return [answer?.observe, QuizHandler.getCurrentQuestion()]
})