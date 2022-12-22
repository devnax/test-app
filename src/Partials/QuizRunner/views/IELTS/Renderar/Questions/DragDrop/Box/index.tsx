import React, { useEffect } from 'react'
import { QuestionProps } from '../types'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ImageBox from './ImageBox'
import Normal from './Normal'
import QuizHandler from '../../../../../../handlers/QuizHandler'
import AnswerExplanationButton from '../../../../components/AnswerExplanationButton'
import { noDispatch, withStore } from 'state-range'

const BoxView = (props: QuestionProps) => {
   const { data } = props
   const reportMode = QuizHandler.getMeta("reportMode")
   const answer = QuizHandler.getQuestion(data.qid)
   const isIncorrect = reportMode && !answer?.correct
   useEffect(() => {
      noDispatch(() => {
         if (answer) {
            !answer?.loaded && QuizHandler.update({ loaded: true }, answer?._id)
         }
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])


   return (
      <Stack
         id={"q" + answer?.qindex}
         onClick={() => QuizHandler.activeQuestion(data.qid)}
         sx={{ userSelect: "none" }}
      >
         {
            data.type === "image" ? <ImageBox {...props} /> : <Normal {...props} />
         }
         {
            isIncorrect && <Box >
               <Stack spacing={1} display="inline-flex" bgcolor="#fafa94" p={1}>
                  <Typography variant="body1" ><b>{answer?.qindex}.</b> correct answers</Typography>
                  <Stack direction="row" spacing={1} >
                     {data.items.map((option: any, idx) => <Stack
                        key={idx}
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                           width: option.width,
                           height: option.height,
                           borderRadius: option.radius || 0,
                           backgroundColor: option.bgcolor || "transparent",
                           borderColor: option.borderColor || "transparent",
                           backgroundImage: option.bgimage ? `url(${option.bgimage})` : "",
                           backgroundRepeat: "no-repeat",
                           backgroundSize: "contain",
                           backgroundPosition: "center",
                           textAlign: "center",
                           justifyContent: "center",
                           alignItems: "center",
                           borderWidth: !isNaN(option.borderWidth as any) ? parseInt(option.borderWidth) : 0,
                           borderStyle: "solid",
                        }}
                     >
                        {option.correctOption && <Typography variant="body1" lineHeight="20px" fontSize={14} fontWeight={600}>{option.correctOption.optionLabel}</Typography>}
                     </Stack>)}
                  </Stack>
                  <AnswerExplanationButton content={data.explanations.incorrect} />
               </Stack>
            </Box>
         }
      </Stack>
   )
}

export default withStore(BoxView, ({ data }) => {
   const answer = QuizHandler.getQuestion(data.qid)
   return [answer?.observe, QuizHandler.getCurrentQuestion()]
})