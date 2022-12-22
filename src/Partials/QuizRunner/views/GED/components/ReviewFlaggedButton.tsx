import React from 'react'
import review_flagIcon from '../Images/review_flag.png'
import review_flagOnIcon from '../Images/review_flag_on.png'
import Button, { ButtonProps } from './ButtonBase'

const ReviewFlagged = (props: ButtonProps) => {
   return (
      <Button
         icon={review_flagIcon.src}
         hoverIcon={review_flagOnIcon.src}
         borderPosition='left'
         {...props}
      >
         Review Flagged
      </Button>
   )
}

export default ReviewFlagged