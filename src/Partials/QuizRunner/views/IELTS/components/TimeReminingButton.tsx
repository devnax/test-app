import React, { useState } from 'react'
import clockIcon from '../Images/clock.png'
import Button from './ButtonBase'
import Stack from '@mui/material/Stack'
import QuizHandler from "@src/Partials/QuizRunner/handlers/QuizHandler";
import Typography from '@mui/material/Typography'
import { withStore } from 'state-range';


const TimeReminingButton = () => {
   const [hover, setHover] = useState(false)
   const times = QuizHandler.getTime()
   const reportMode = QuizHandler.getMeta("reportMode")
   if (!times || reportMode) {
      return <></>
   }

   const ms5 = (1000 * 60) * 5
   let isLess = times.currentTime.milliseconds < ms5

   return (
      <Button
         sx={{
            minWidth: 25,
            height: 20,
            pr: 0,
            display: "flex"
         }}
         onMouseEnter={() => setHover(true)}
         onMouseLeave={() => setHover(false)}
      >
         <Stack component="span" direction="row" alignItems="center" >
            <picture style={{ display: "inherit" }}>
               <img src={clockIcon.src} width={30} alt="" />
            </picture>
            <Stack component="span" fontSize="1.2em" direction="row" alignItems="center" color={isLess ? "red" : "rgb(255, 240, 189)"}>
               {
                  (hover || isLess) ? <>
                     {times.currentTime.time}&nbsp;
                     <Typography component="span" fontSize={15}>left</Typography>
                  </> : <>
                     {parseInt((times.currentTime.milliseconds / 1000) / 60 as any)}&nbsp;
                     <Typography component="span" fontSize={15}>minutes left</Typography>
                  </>
               }
            </Stack>
         </Stack>
      </Button>
   )
}

export default withStore(TimeReminingButton)