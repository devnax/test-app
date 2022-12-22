import React from 'react'
import end_testIcon from '../Images/end_test.png'
import end_testOnIcon from '../Images/end_test_on.png'
import Button, { ButtonProps } from './ButtonBase'


const EndTestButton = (props: ButtonProps) => {
   return (
      <Button
         icon={end_testIcon.src}
         hoverIcon={end_testOnIcon.src}
         borderPosition='right'
         {...props}
      >
         End Test
      </Button>
   )
}

export default EndTestButton