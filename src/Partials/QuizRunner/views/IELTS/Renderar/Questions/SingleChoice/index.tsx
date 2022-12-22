import React, { useMemo, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import { QuestionProps } from './types'
import Option from './Option'
import QuizHandler from '../../../../../handlers/QuizHandler'
import AnswerExplanationButton from '../../../components/AnswerExplanationButton'
import Accordion from '../../../components/Accordion'
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
         !answer.loaded && QuizHandler.update({ loaded: true }, answer._id)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   if (!answer) {
      return <>Invalid Question</>
   }


   const option_tmp = options.map((o, index: number) => {
      const option = o.option
      const errorColor = isIncorrect && answer.value === o.index ? "rgb(255, 143, 130)" : ""
      return <Option
         key={index}
         index={index}
         data={data}
         option={option}
         checked={answer.value === o.index}
         bgcolor={isIncorrect && option.correct ? "rgb(156, 247, 156)" : errorColor}
         onClick={() => {
            if (reportMode) return
            let v: any = o.index
            if (answer.value === o.index) {
               v = null
            }
            QuizHandler.update({ value: v }, answer._id)
         }}
      />
   })

   return (<Stack
      id={"q" + answer.qindex} onClick={() => QuizHandler.activeQuestion(data.qid)}>
      <Accordion qindex={answer.qindex} >
         <Stack>
            {
               option_tmp
            }
            <AnswerExplanationButton content={data.explanations.incorrect} />
         </Stack>
      </Accordion>
   </Stack>)

}

export default withStore(QuestionContainer, ({ data }) => {
   const answer = QuizHandler.getQuestion(data.qid)
   const activeQuestion = QuizHandler.getCurrentQuestion()
   return [answer?.observe, activeQuestion]
})