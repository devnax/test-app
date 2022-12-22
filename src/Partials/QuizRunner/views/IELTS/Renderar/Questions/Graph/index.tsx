import React, { useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { QuestionProps } from './types'
import { withStore } from 'state-range'
import QuizHandler from '../../../../../handlers/QuizHandler'
import Typography from '@mui/material/Typography'
import InfoIcon from '../../../Images/info-blue.png'
import AnswerExplanationButton from '../../../components/AnswerExplanationButton'
import Anotation from '@src/Partials/QuizRunner/views/Anotation'


const Graph = (props: QuestionProps) => {
   const { data } = props
   const question = QuizHandler.getQuestion(data.qid)
   const isActive = QuizHandler.getMeta("activeQuestion") === question?.qindex
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

   return <Stack id={"q" + question?.qindex} spacing={2} onClick={() => QuizHandler.activeQuestion(data.qid)} sx={{
      '& p': {
         m: 0
      }
   }}>
      <Stack direction="row" spacing={1} bgcolor={isActive ? "#b4dbf7" : ""} px={1} borderRadius={1}>
         <b>{question.qindex}.</b>
         {data.questionContent && <Anotation id={data.qid} content={data.questionContent} />}
      </Stack>
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
                  dialog: true,
                  content: <Stack p={2}>
                     <Stack direction="row" spacing={1}>
                        <picture style={{ width: 20 }}>
                           <img src={InfoIcon.src} alt="" width="100%" />
                        </picture>
                        <Typography variant="body1" color="#000">You have reached the maximum number of selections for this item.</Typography>

                     </Stack>
                  </Stack>,
                  width: 400,
                  height: 150
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

export default withStore(Graph, ({ data }: QuestionProps) => {
   const q = QuizHandler.getQuestion(data.qid)
   return [q?.observe, QuizHandler.getCurrentQuestion()]
})