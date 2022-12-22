import React from 'react'
import review_flagIcon from '../Images/review_flag.png'
import review_flagOnIcon from '../Images/review_flag_on.png'
import Button from './ButtonBase'
import QuizHandler from "@src/Partials/QuizRunner/handlers/QuizHandler"
import { withStore } from 'state-range'

const FlagForReview = () => {
   const question = QuizHandler.getCurrentQuestion()

   return (
      <Button
         icon={review_flagIcon.src}
         hoverIcon={review_flagOnIcon.src}
         active={question?.flagged}
         sx={{ pr: 0 }}
         onClick={() => {
            question && QuizHandler.update({ flagged: !question.flagged }, question._id)
         }}
      >
         Flag for Review
      </Button>
   )
}

export default withStore(FlagForReview)