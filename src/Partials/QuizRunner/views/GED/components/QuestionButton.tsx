import React, { useState } from 'react'
import questionIcon from '../Images/question.png'
import questionOnIcon from '../Images/question_on.png'
import Button, { ButtonProps } from './ButtonBase'

interface Props extends ButtonProps {
   from: number;
   to: number;
}

const QuestionButton = ({ from, to }: Props) => {
   const [hide, setHide] = useState(false)

   return (
      <Button
         icon={questionIcon.src}
         hoverIcon={questionOnIcon.src}
         sx={{
            minWidth: 25,
            height: 20,
            pr: 0
         }}
         onClick={() => setHide(!hide)}
      >
         {!hide && <> Question {from} to {to}</>}
      </Button>
   )
}

export default QuestionButton