import React, { useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { QuestionProps } from './types'
import { withStore } from 'state-range'
import QuizHandler from '../../../../../handlers/QuizHandler'
import Typography from '@mui/material/Typography'
import InfoIcon from '../../../Images/info_icon.jpg'
import Button from '../../../components/Button'
import AnswerExplanationButton from '../../../components/AnswerExplanationButton'
import Anotation from '@src/Partials/QuizRunner/views/Anotation'

const Graph = (props: QuestionProps) => {
   const { data } = props
   const question = QuizHandler.getQuestion(data.qid)
   const boxRef: any = useRef()
   const reportMode = QuizHandler.getMeta("reportMode")
   const isIncorrect = reportMode && !question?.correct || false

   useEffect(() => {
      if (question) {
         !question.loaded && QuizHandler.update({ loaded: true }, question._id)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   if (!question) return <></>
   const value = (question.value || []) as any

   return <Stack spacing={2} onClick={() => QuizHandler.activeQuestion(data.qid)}>
      {data.questionContent && <Anotation id={data.qid} content={data.questionContent} />}
      <Box
         width={data.width}
         height={data.height}
         ref={boxRef}
         position="relative"
         sx={{
            backgroundImage: `url(${data.image_url})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain"
         }}
         onClick={(e: any) => {
            if (reportMode) return
            if (e.target.getAttribute("data-point")) {
               return;
            }
            if (value.length >= Object.values(data.fields).length) {
               QuizHandler.setMeta("showModal", {
                  title: "Maximum Selections",
                  draggable: false,
                  content: <Stack>
                     <Stack direction="row" spacing={2}>
                        <picture style={{ width: 50 }}>
                           <img src={InfoIcon.src} alt="" width="100%" />
                        </picture>
                        <Typography variant="body1" color="#fff">You have reached the maximum number of selections for this item.</Typography>

                     </Stack>
                     <Stack alignItems="center" mt={3}>
                        <Button onClick={() => QuizHandler.deleteMeta("showModal")}>Ok</Button>
                     </Stack>
                  </Stack>,
                  width: 500,
                  height: 200
               })
               return
            }
            const rect = boxRef.current.getBoundingClientRect()

            QuizHandler.update({
               value: [
                  ...(question?.value || []) as any,
                  {
                     top: (e.pageY - rect.top) - 5,
                     left: (e.pageX - rect.left) - 5
                  }
               ]
            }, question._id)

         }}
      >


         {
            value.map((val: any, idx: any) => <Box key={idx}
               width={10}
               height={10}
               position="absolute"
               top={val.top}
               left={val.left}
               bgcolor="#00aff0"
               borderRadius="100%"
               data-point
               sx={{
                  cursor: "text"
               }}
               onClick={() => {
                  if (reportMode) return
                  value.splice(idx, 1)
                  QuizHandler.update({
                     value: [
                        ...value
                     ]
                  }, question._id)
               }}
            >

            </Box>)
         }

         {
            isIncorrect && Object.values(data.fields).map((val: any, idx: any) => <Box key={idx}
               width={10}
               height={10}
               position="absolute"
               top={val.top}
               left={val.left}
               bgcolor="success.main"
               borderRadius="100%"
            >

            </Box>)
         }
      </Box>
      {
         isIncorrect && <Box mt={1}>
            <Stack spacing={1} display="inline-flex" bgcolor="#fafa94" p={1}>
               <Typography variant="body1" ><b>{question?.qindex}.</b> correct answers
                  <Box
                     width={10}
                     height={10}
                     bgcolor="success.main"
                     borderRadius="100%"
                     component="span"
                     display="inline-block"
                     ml={1}
                  >

                  </Box>
               </Typography>
               <AnswerExplanationButton content={data.explanations.incorrect} />
            </Stack>
         </Box>
      }
   </Stack>
}

export default withStore(Graph, ({ data }) => {
   const answer = QuizHandler.getQuestion(data.qid)
   return [answer?.observe, QuizHandler.getCurrentQuestion()]
})