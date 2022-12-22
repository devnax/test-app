import React, { useState } from 'react'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Button from '../components/Button'
import infoIcon from '../Images/info_icon.webp'
import warningIcon from '../Images/warning.webp'
import QuizHandler from "@src/Partials/QuizRunner/handlers/QuizHandler"
import { withStore } from 'state-range'


interface Props {
   confirm?: boolean;
}


const EndReview = ({ confirm }: Props) => {
   const unanswered = QuizHandler.find({ value: null })
   const [loading, setLoading] = useState(false)

   if (loading) {
      return <Stack spacing={1} p={3} justifyContent="center" alignItems="center" height="100%">
         <CircularProgress sx={{ color: "#fff" }} />
      </Stack>
   }
   return (
      <Stack>
         <Stack direction="row" spacing={2} p={1.5}>
            <Stack>
               <picture>
                  <img src={confirm ? warningIcon.src : infoIcon.src} alt="" />
               </picture>
            </Stack>

            <Stack spacing={2}>
               <Typography variant="body1" color="#fff">
                  {
                     confirm ? <>
                        Please confirm that you want to end this review. If you click Yes, you will NOT be able to return to test questions.
                     </> : <>You have chosen to end the current review, but have {unanswered.length} unanswered questions. If you click Yes, you will NOT be able to return to this review.
                     </>
                  }
               </Typography>
               <Typography variant="body1" color="#fff">
                  Are you sure you want to end this review?
               </Typography>
            </Stack>
         </Stack>
         <Stack alignItems="center" p={2} direction="row" justifyContent="center" spacing={1}>
            <Button
               onClick={async () => {
                  if (!confirm) {
                     QuizHandler.setMeta("showModal", {
                        content: <EndReview confirm />,
                        title: "End Review",
                        width: 550,
                        height: 270
                     })
                  } else {
                     setLoading(true)
                     await QuizHandler.finishQuiz()
                     setLoading(false)
                  }
               }}
            >Yes</Button>
            <Button onClick={() => QuizHandler.deleteMeta("showModal")}>No</Button>
         </Stack>
      </Stack>
   )
}

export default withStore(EndReview)