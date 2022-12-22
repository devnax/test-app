import React, { useMemo, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { QuestionProps } from './types'
import Option from './Option'
import Select from './Select'
import QuizHandler from '../../../../../handlers/QuizHandler'
import AnswerExplanationButton from '../../../components/AnswerExplanationButton'
import Anotation from '@src/Partials/QuizRunner/views/Anotation'
import { withStore } from 'state-range'


const QuestionContainer = (props: QuestionProps) => {
   const { data } = props
   const answer = QuizHandler.getQuestion(data.qid)
   const reportMode = QuizHandler.getMeta("reportMode")
   const isIncorrect = reportMode && !answer?.correct || false

   const options = useMemo(() => {
      const _options = [...data.options]

      if (data.randomSorting && !answer?.loaded) {
         _options.sort(() => Math.random() - 0.5);
      }

      return _options.map((o, idx) => ({
         index: idx,
         option: o
      }))
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

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
         {data.questionContent && <Anotation
            id={data.qid}
            content={data.questionContent}
         />}
         <Box
            sx={{
               '& select': {
                  outline: "none"
               }
            }}
         >
            <Select
               error={isIncorrect}
               placeholder='Select'
               value={answer.value as any}
               options={options.map((opt, idx) => ({
                  label: <Option
                     key={idx}
                     data={data}
                     option={opt.option}
                  />,
                  value: opt.index
               }))}
               onChange={(val) => {
                  QuizHandler.update({ value: val }, answer._id)
               }}
            />

         </Box>
         {
            isIncorrect && <Box mt={1}>
               <Stack spacing={1} display="inline-flex" bgcolor="#fafa94" p={1}>
                  <Typography variant="body1" ><b>{answer?.qindex}.</b> correct answers</Typography>
                  <Stack direction="row" spacing={1} >
                     {options.map((o: any, idx) => {
                        if (o.option.correct) {
                           return <Chip key={idx} label={decodeURIComponent(o.option.label)} />
                        }
                     })}
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
   return [answer?.observe, QuizHandler.getCurrentQuestion()]
})