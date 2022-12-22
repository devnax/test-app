import React from 'react'
import icon from '../Images/back_to_review.png'
import onIcon from '../Images/back_to_review_on.png'
import Button, { ButtonProps } from './ButtonBase'


const ReviewScreenButton = (props: ButtonProps) => {
   return (
      <Button
         icon={icon.src}
         hoverIcon={onIcon.src}
         borderPosition='right'
         {...props}
      >
         Review Screen
      </Button>
   )
}

export default ReviewScreenButton