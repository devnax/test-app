/* eslint-disable @next/next/no-img-element */
import React, { memo } from 'react'
import QuizHandler from '@src/Partials/QuizRunner/handlers/QuizHandler'
import Button from './Button'
import ShadowButton from './ShadowButton'
import Stack from '@mui/material/Stack'
import monitorIcon from '../Images/monitor.png'
import Typography from '@mui/material/Typography'


const Modal = () => {
   return <Stack spacing={1} p={3}>
      <Typography variant='body1'>Your answers have been stored.</Typography>
      <Typography variant='body1'>Please note that the clock is still running. The time has not been paused.</Typography>
      <Typography variant='body1'>If you wish to leave the room, please tell your invigilator.</Typography>
      <Typography variant='body1'>Click the button bellow to go back to your test.</Typography>
   </Stack>
}


const HideButton = () => {
   return (
      <Button
         onClick={() => {
            QuizHandler.setMeta("showModal", {
               title: <Stack direction="row" alignItems="center" spacing={1} >
                  <picture>
                     <img src={monitorIcon.src} alt="" />
                  </picture>
                  <Typography variant="h6" color="#fff">Screen hidden</Typography>
               </Stack>,
               footer: <Stack direction="row" alignItems="center" justifyContent="center" py={1} pb={2}>
                  <ShadowButton onClick={() => {
                     QuizHandler.deleteMeta("showModal")
                  }}>Resume Test</ShadowButton>
               </Stack>,
               content: <Modal />,
               dialog: true,
               draggable: false,
               width: 550,
               height: 320,
               layerProps: {
                  sx: {
                     bgcolor: "rgb(32, 32, 32)"
                  }
               }
            })
         }}
      >
         <Stack direction="row" alignItems="center" spacing={2}>
            Hide
         </Stack>
      </Button>
   )
}

export default memo(HideButton)