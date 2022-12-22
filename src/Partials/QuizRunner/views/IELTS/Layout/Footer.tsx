import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import QuizHandler from "@src/Partials/QuizRunner/handlers/QuizHandler"
import NextButton from '../components/NextButton'
import PrevButton from '../components/PrevButton'
import NavigateButton from '../components/NavigateButton'
import NavigationArrorwButton from '../components/NavigationArrorwButton'
import Typography from '@mui/material/Typography'
import { withStore } from 'state-range'



interface NavigatePartProps {
   page: number
}

const NavigatePart = ({ page }: NavigatePartProps) => {
   const questions = QuizHandler.find({ page })
   if (!questions.length) {
      return <></>
   }

   return (
      <Stack direction="row" alignItems="center" spacing={1}>
         <Typography variant="h6" color="#333">Part {page + 1}</Typography>
         <Stack direction="row" alignItems="center" spacing={.4}>
            {
               questions.map((q) => {
                  return <Box key={q._id}>
                     <NavigateButton qindex={q.qindex} />
                  </Box>
               })
            }
         </Stack>
      </Stack>
   )
}


const Footer = () => {
   const quizData = QuizHandler.getMeta("data") || []
   const cques = QuizHandler.getCurrentQuestion()
   const isVisible = QuizHandler.getMeta("paginationVisible")

   return (
      <Stack
         width="100%"
         direction="row"
         justifyContent="space-between"
         alignItems="flex-end"
         px={2}
         pt={1}
         spacing={2}
      >
         <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <input
               type="checkbox"
               checked={cques?.flagged || false}
               onChange={() => {
                  cques && QuizHandler.update({ flagged: !cques.flagged }, cques._id)
               }}
            />
            <Typography variant="body1" display={{
               md: "block",
               xs: "none"
            }}>Review</Typography>
         </Stack>
         <Stack
            flex={1}
            direction="row"
            alignItems="center"
            spacing={4}
            p={!isVisible ? 1 : 1.5}
            sx={{
               width: "100%",
               border: "1px solid #fff",
               display: "flex",
               overflow: "hidden",
               position: "relative",
               background: "hsla(0,0%,100%,.25)",
               boxShadow: "0 1px 3px rgb(0 0 0 / 50%)",
               overflowX: "auto",
               alignItems: "center",
               whiteSpace: "nowrap",
               borderBottom: "0",
               borderRadius: "8px 8px 0 0",
               backgroundColor: "#dde3ee",
            }}
         >
            {
               quizData.map((_d, idx) => <NavigatePart key={idx} page={idx} />)
            }
         </Stack>
         <Stack direction="row" alignItems="center">
            <NavigationArrorwButton />
            <PrevButton />
            <NextButton />
         </Stack>
      </Stack >
   )
}

export default withStore(Footer, () => {
   const cq = QuizHandler.getMeta("activeQuestion")
   const cp = QuizHandler.getMeta("activePage")
   const pv = QuizHandler.getMeta("paginationVisible")
   const cques = QuizHandler.getCurrentQuestion()
   return [cq, cp, pv, cques?.flagged]
})