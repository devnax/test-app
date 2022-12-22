import React from 'react'
import QuizHandler from '@src/Partials/QuizRunner/handlers/QuizHandler'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'

const LoadingDialog = () => {
   QuizHandler.setMeta("showModal", {
      title: "Test ended",
      content: <Stack spacing={1} p={3} justifyContent="center" alignItems="center" height="100%">
         <CircularProgress color="info" />
      </Stack>,
      dialog: true,
      width: 500,
      height: 200,
      layerProps: {
         sx: {
            bgcolor: "rgb(32, 32, 32)"
         }
      }
   })
}

export default LoadingDialog