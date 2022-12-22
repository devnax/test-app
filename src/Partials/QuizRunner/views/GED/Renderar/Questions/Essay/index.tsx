import React, { useEffect, useRef } from 'react'
import Stack from '@mui/material/Stack'
import { QuestionProps } from './types'
import Header from './Header'
import useUndo from "@src/Partials/QuizRunner/helpers/useUndo"
import QuizHandler from '@src/Partials/QuizRunner/handlers/QuizHandler'
import Anotation from '@src/Partials/QuizRunner/views/Anotation'
import { withStore } from 'state-range'


const QuestionContainer = (props: QuestionProps) => {
   const { data } = props
   const answer = QuizHandler.getQuestion(data.qid)
   const inputRef: any = useRef()
   const undoHandler = useUndo()
   const reportMode = QuizHandler.getMeta("reportMode")

   useEffect(() => {
      if (answer) {
         !answer?.loaded && QuizHandler.update({ loaded: true }, answer?._id)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   if (!answer) {
      return <>Invalid Question</>
   }


   return (
      <Stack onClick={() => QuizHandler.activeQuestion(data.qid)}>
         {data.questionContent && <Anotation id={data.qid} content={data.questionContent} />}

         <Stack
            border={2}
            borderColor="#80aee1"
         >
            <Header inputRef={inputRef} {...props} undoHandler={undoHandler} />
            <textarea
               ref={inputRef}
               style={{
                  border: 0,
                  maxWidth: "100%",
                  fontSize: 16,
                  padding: 6
               }}
               value={answer.value as any || ""}
               onChange={(e) => {
                  if (reportMode) return
                  QuizHandler.update({ value: e.target.value }, answer._id)
                  undoHandler.add(e.target.value)
               }}
            />
         </Stack>
      </Stack>
   )
}

export default withStore(QuestionContainer, ({ data }) => {
   const answer = QuizHandler.getQuestion(data.qid)
   return [answer?.observe, QuizHandler.getCurrentQuestion()]
})