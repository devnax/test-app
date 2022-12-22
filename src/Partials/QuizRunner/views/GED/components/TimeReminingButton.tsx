import React, { useState } from 'react'
import timeIcon from '../Images/time.png'
import timeOnIcon from '../Images/time_on.png'
import Button from './ButtonBase'
import Stack from '@mui/material/Stack'
import QuizHandler from "@src/Partials/QuizRunner/handlers/QuizHandler";
import { getTimer } from '@src/Partials/QuizRunner/helpers/useTimer'

const TimeReminingButton = () => {
   const [hide, setHide] = useState(false)
   const quiz = QuizHandler.getQuizPost()
   const timer = getTimer(quiz.id)

   if (!timer) {
      return <></>
   }
   const times = timer.getTime()

   return (
      <Button
         icon={timeIcon.src}
         hoverIcon={timeOnIcon.src}
         onClick={() => setHide(!hide)}
         sx={{
            minWidth: 25,
            height: 20,
            pr: 0
         }}
      >
         <Stack component="span" direction="row" alignItems="center" display={hide ? "none" : "flex"}>
            Time remining &nbsp;
            <span>
               {times.currentTime.time}
            </span>
         </Stack>
      </Button>
   )
}

export default TimeReminingButton