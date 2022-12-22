import QuizHandler from '@src/Partials/QuizRunner/handlers/QuizHandler'
import React from 'react'
import icon from '../Images/back_to_review.png'
import onIcon from '../Images/back_to_review_on.png'
import Button from './ButtonBase'

const ResultScreenButton = () => {
   return (
      <Button
         icon={icon.src}
         hoverIcon={onIcon.src}
         borderPosition='right'
         onClick={() => {
            QuizHandler.reset()
            QuizHandler.setMeta("finished", true)
         }}
      >
         Result Screen
      </Button>
   )
}

export default ResultScreenButton