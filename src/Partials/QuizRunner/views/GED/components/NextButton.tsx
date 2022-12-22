import React from 'react'
import NextIcon from '../Images/next.png'
import NextHoverIcon from '../Images/next_on.png'
import Button, { ButtonProps } from './ButtonBase'


const NextButton = (props: ButtonProps) => {
   return (
      <Button
         icon={NextIcon.src}
         hoverIcon={NextHoverIcon.src}
         iconPosition="right"
         borderPosition='left'
         {...props}
      >
         Next
      </Button>
   )
}

export default NextButton