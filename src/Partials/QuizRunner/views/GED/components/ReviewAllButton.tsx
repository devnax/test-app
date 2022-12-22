import React from 'react'
import review_allIcon from '../Images/review_all.png'
import review_allOnIcon from '../Images/review_all_on.png'
import Button, { ButtonProps } from './ButtonBase'

const ReviewAllButton = (props: ButtonProps) => {
   return (
      <Button
         icon={review_allIcon.src}
         hoverIcon={review_allOnIcon.src}
         borderPosition='left'
         {...props}
      >
         Review All
      </Button>
   )
}

export default ReviewAllButton