import React from 'react'
import unanswerIcon from '../Images/unanswer.png'
import unanswerOnIcon from '../Images/unanswer_on.png'
import Button, { ButtonProps } from './ButtonBase'

const ReviewUnanswered = (props: ButtonProps) => {
   return (
      <Button
         icon={unanswerIcon.src}
         hoverIcon={unanswerOnIcon.src}
         borderPosition='left'
         {...props}
      >
         Review Unanswered
      </Button>
   )
}

export default ReviewUnanswered