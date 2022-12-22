import React from 'react'
import QuizHandler from '@src/Partials/QuizRunner/handlers/QuizHandler'
import ShadowButton from '../components/ShadowButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const showTestEndedModal = (next: () => void) => {
   QuizHandler.setMeta("showModal", {
      title: "Test ended",
      onClose: () => {
         QuizHandler.deleteMeta("showModal")
         next()
      },
      footer: <Stack direction="row" alignItems="center" justifyContent="center" py={1} pb={2}>
         <ShadowButton onClick={() => {
            QuizHandler.deleteMeta("showModal")
            next()
         }}>Continue</ShadowButton>
      </Stack>,
      content: <Stack spacing={1} p={3}>
         <Typography variant='body1'>Your test is finished</Typography>
         <Typography variant='body1'>All of your answers have been stored</Typography>
         <Typography variant='body1'>Please wait for further instructions</Typography>
      </Stack>,
      dialog: true,
      width: 500,
      height: 250,
      layerProps: {
         sx: {
            bgcolor: "rgb(32, 32, 32)"
         }
      }
   })
}

export default showTestEndedModal