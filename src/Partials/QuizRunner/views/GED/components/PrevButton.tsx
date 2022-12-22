import React from 'react'
import prevIcon from '../Images/prev.png'
import prevOnIcon from '../Images/prev_on.png'
import Button, { ButtonProps } from './ButtonBase'


const PrevButton = (props: ButtonProps) => {
   return (
      <Button
         icon={prevIcon.src}
         hoverIcon={prevOnIcon.src}
         borderPosition='left'
         {...props}
      >
         Previous
      </Button>
   )
}

export default PrevButton