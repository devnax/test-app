import React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '../components/Button'
import QuizHandler from "@src/Partials/QuizRunner/handlers/QuizHandler"

const InstructionModal = () => {
   return (
      <Stack color="#fff" p={1.5}>
         <Typography variant="body1" color="#fff" mt={2}>Below is a list of the test questions.</Typography>
         <ul>
            <li>If you did not answer a question, the word Unanswered appears next to the question number.</li>
            <li>If you marked a question that you wanted to review, the flag outline will be filled in with blue.</li>
            <li>You can click on a Question name to review your answer.</li>
            <li>You can also use the buttons in the blue bar at the bottom of the screen.</li>
         </ul>
         <Stack alignItems="center" mt={2}>
            <Button onClick={() => QuizHandler.deleteMeta("showModal")}>Close</Button>
         </Stack>
      </Stack>
   )
}

export default InstructionModal