import QuizHandler from '@src/Partials/QuizRunner/handlers/QuizHandler'
import React from 'react'
import arrowDownIcon from '../Images/navigation-arrow-down.png'
import arrowUpIcon from '../Images/navigation-arrow-up.png'


const NextButton = () => {
   const isVisible = QuizHandler.getMeta("paginationVisible")
   return (
      <button
         style={{
            width: "28px",
            border: "none",
            height: "28px",
            display: "block",
            outline: "none",
            padding: "0",
            borderRadius: "0",
            backgroundSize: "cover",
            backgroundColor: "initial",
            backgroundImage: `url(${isVisible ? arrowDownIcon.src : arrowUpIcon.src})`,
            backgroundRepeat: "no-repeat",
            cursor: "pointer",
         }}

         onClick={() => {
            QuizHandler.setMeta("paginationVisible", !isVisible)
         }}
      >

      </button>
   )
}

export default NextButton