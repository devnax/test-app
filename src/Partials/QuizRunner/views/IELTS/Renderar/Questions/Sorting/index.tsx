import React, { useMemo, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { QuestionProps } from '../SingleChoice/types'
import Option from './Option'
import { Droppable } from 'react-draghost'
import { arrayMoveImmutable } from 'array-move';
import QuizHandler from '../../../../../handlers/QuizHandler'
import AnswerExplanationButton from '../../../components/AnswerExplanationButton'
import { noDispatch, withStore } from 'state-range'
import Anotation from '@src/Partials/QuizRunner/views/Anotation'

const QuestionContainer = (props: QuestionProps) => {
   const { data } = props
   const answer = QuizHandler.getQuestion(data.qid)
   const reportMode = QuizHandler.getMeta("reportMode")
   const isIncorrect = reportMode && !answer?.correct || false
   const indexes = answer?.value
   const isActive = QuizHandler.getMeta("activeQuestion") === answer?.qindex

   const sortedIndexes = useMemo(() => {
      if (!answer?.loaded) {
         const _indexes = data.options.map((_o, idx) => idx)
         _indexes.sort(() => Math.random() - 0.5)

         let count = 0;
         while (data.options.filter((_o, idx) => _indexes[idx] === idx).length) {
            _indexes.sort(() => Math.random() - 0.5)
            count++;
            if (count > 100) {
               break
            }
         }
         noDispatch(() => {
            if (answer) {
               QuizHandler.update({ data: { ...answer.data, sortedIndexes: _indexes } }, answer._id)
            }
         })
         return _indexes
      }
      const _answer = QuizHandler.getQuestion(data.qid)
      return _answer?.data.sortedIndexes || []
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])


   useEffect(() => {
      if (answer) {
         !answer.loaded && QuizHandler.update({ loaded: true }, answer._id)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])


   if (!answer) {
      return <>Invalid Question</>
   }

   return (
      <Stack id={"q" + answer.qindex} onClick={() => QuizHandler.activeQuestion(data.qid)}>
         <Stack
            direction="row"
            spacing={1}
            mb={1}
            sx={{
               '& p': {
                  m: 0
               }
            }}
            px={1}
            borderRadius={1}
            bgcolor={isActive ? "#b4dbf7" : ""}
         >
            <b>{answer.qindex}.</b>
            {
               data.questionContent && <Anotation id={data.qid} content={data.questionContent} />
            }
         </Stack>
         <Droppable
            disabled={reportMode || false}
            id={answer._id}
            selfOnly
            onDrop={({ fromIndex, toIndex }: any) => {
               const ans = QuizHandler.getQuestion(data.qid)
               if (ans) {
                  const values = ans?.value || sortedIndexes
                  const value = arrayMoveImmutable(values, fromIndex, toIndex)
                  QuizHandler.update({ value }, ans._id)
               }
               QuizHandler.activeQuestion(data.qid)
            }}
         >
            {
               (indexes || sortedIndexes).map((idx: number) => {
                  const option = data.options[idx]
                  return <Option
                     key={idx}
                     data={data}
                     option={option}
                  />
               })
            }
         </Droppable>
         {
            isIncorrect && <Box mt={1}>
               <Stack spacing={1} bgcolor="#fafa94" p={1}>
                  <Typography variant="body1" ><b>{answer?.qindex}.</b> correct answers</Typography>
                  <Stack  >
                     {data.options.map((option: any, idx) => <Option
                        key={idx}
                        data={data}
                        option={option}
                     />)}
                  </Stack>
                  <AnswerExplanationButton content={data.explanations.incorrect} />
               </Stack>
            </Box>
         }
      </Stack>
   )
}

export default withStore(QuestionContainer, ({ data }) => {
   const answer = QuizHandler.getQuestion(data.qid)
   const activeQuestion = QuizHandler.getCurrentQuestion()
   return [answer?.observe, activeQuestion]
})