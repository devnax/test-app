import React, { useMemo, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import { QuestionProps } from './types'
import Option from './Option'
import QuizHandler from '../../../../../handlers/QuizHandler'
import AnswerExplanationButton from '../../../components/AnswerExplanationButton'
import Accordion from '../../../components/Accordion'
import { withStore } from 'state-range'
import Anotation from '@src/Partials/QuizRunner/views/Anotation'



const QuestionContainer = (props: QuestionProps) => {
   const { data } = props
   const answer = QuizHandler.getQuestion(data.qid)
   let answerValue = (answer?.value || []) as number[]
   const reportMode = QuizHandler.getMeta("reportMode")
   const isIncorrect = reportMode && !answer?.correct || false
   const activeQuestion = QuizHandler.getMeta("activeQuestion")
   const active = activeQuestion === answer?.qindex

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
         !answer.loaded && QuizHandler.update({ loaded: true }, answer._id)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   if (!answer) {
      return <>Invalid Question</>
   }


   const renderedOptions = options.map((o, index: number) => {
      const option = o.option
      const errorColor = isIncorrect && answerValue.includes(o.index) ? "rgb(255, 143, 130)" : ""
      let opt = <Option
         index={index}
         data={data}
         option={option}
         checked={answerValue.includes(o.index)}
         bgcolor={reportMode && option.correct ? "rgb(156, 247, 156)" : errorColor}
         onClick={() => {
            if (reportMode) return
            if (answerValue.includes(o.index)) {
               answerValue = answerValue.filter(i => i !== o.index)
            } else {
               if (data.maxChecked && !(answerValue.length >= data.maxChecked)) {
                  answerValue.push(o.index)
               } else {
                  answerValue.push(o.index)
               }
            }
            QuizHandler.update({ value: answerValue }, answer._id)
         }}
      />

      if (data.inline) {
         return <td key={index} align="center" >
            {opt}
         </td>
      }
      return <div key={index}>
         {opt}
      </div>
   })

   if (data.inline) {
      return (
         <tr
            onClick={() => QuizHandler.activeQuestion(data.qid)}
            style={{ background: active ? "rgba(181, 234, 255, 0.5)" : "" }}>
            <td>
               <Stack
                  id={"q" + answer.qindex}
                  direction="row"
                  alignItems="center"
                  pl={1}
                  sx={{
                     '& p': {
                        p: 0,
                        m: 0,
                        px: 1
                     }
                  }}>
                  <b >{answer.qindex}.</b>
                  <Anotation
                     id={data.qid}
                     content={data.questionContent}
                     sx={{
                        '& p': {
                           p: 0,
                           m: 0,
                           px: 1
                        }
                     }}
                  />
               </Stack>

               <AnswerExplanationButton content={data.explanations.incorrect} />
            </td>
            {
               renderedOptions
            }

         </tr>
      )
   }


   return <Stack
      id={"q" + answer.qindex} onClick={() => QuizHandler.activeQuestion(data.qid)}>
      <Accordion qindex={answer.qindex}>
         <Stack>
            {
               renderedOptions
            }
            <AnswerExplanationButton content={data.explanations.incorrect} />
         </Stack>
      </Accordion>
   </Stack>

}

export default withStore(QuestionContainer, ({ data }) => {
   const answer = QuizHandler.getQuestion(data.qid)
   const activeQuestion = QuizHandler.getCurrentQuestion()
   return [answer?.observe, activeQuestion]
})