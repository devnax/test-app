import React from 'react'
import end_testIcon from '../Images/end_test.png'
import end_testOnIcon from '../Images/end_test_on.png'
import Button from './ButtonBase'
import Handler from "@src/Partials/QuizRunner/handlers/QuizHandler"
import EndReview from '../ModalViews/EndReview'

const EndReviewButton = () => {
   return (
      <Button
         icon={end_testIcon.src}
         hoverIcon={end_testOnIcon.src}
         borderPosition='right'
         onClick={() => {
            Handler.setMeta("showModal", {
               content: <EndReview />,
               title: "End Review",
               width: 550,
               height: 270
            })
         }}
      >
         End Review
      </Button>
   )
}

export default EndReviewButton