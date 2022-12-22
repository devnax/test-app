import React from 'react'
import ButtonBase from '@mui/material/ButtonBase'
import navigateBgIcon from '../Images/navigate-button-active.png'
import navigateBgWhiteIcon from '../Images/navigate-button-white.png'
import QuizHandler from '@src/Partials/QuizRunner/handlers/QuizHandler';

type NavigateButtonProps = {
   qindex: number;
}



/* 
   
    
*/

const NavigateButton = ({ qindex }: NavigateButtonProps) => {
   const question = QuizHandler.findFirst({ qindex })
   const isVisible = QuizHandler.getMeta("paginationVisible")
   const activeQuestion = QuizHandler.getMeta("activeQuestion") as number
   if (!question) {
      return <></>
   }

   const active = activeQuestion === qindex

   let sx: any = {}
   if (active) {
      sx.backgroundImage = `url(${navigateBgIcon.src})`
   }

   if (question.flagged) {
      sx.borderRadius = 23
   }

   if (!isVisible && active) {
      sx = {
         ...sx,
         width: 0,
         border: "10px solid #dbe5f5",
         borderColor: "transparent",
         height: 0,
         margin: 0,
         padding: "0 1px 0 0",
         borderTop: "17px solid #1098dc",
         boxShadow: "none",
         borderBottom: "none",
         borderRadius: 0,
         marginTop: "-4px"
      }
   } else if (!active && isVisible && question.value) {
      sx = {
         ...sx,
         color: "#000",
         textShadow: "none",
         borderColor: "#fff",
         backgroundColor: "#fff",
         backgroundImage: `url(${navigateBgWhiteIcon.src})`
      }
   }

   return (
      <ButtonBase
         disableRipple
         sx={{
            cursor: "pointer",
            textShadow: "0 0 2px #000, 0 0 2px #000",
            border: 1,
            borderColor: active ? "#34b2f1" : "#000",
            bgcolor: "#000",
            width: isVisible ? 23 : 14,
            height: isVisible ? 23 : 14,
            color: "#fff",
            display: "inline-block",
            padding: 0,
            position: "relative",
            fontSize: "14px",
            boxShadow: "0 1px 3px rgb(0 0 0 / 50%)",
            textAlign: "center",
            fontWeight: "700",
            marginRight: "1px",
            borderRadius: "2px",
            ...sx
         }}
         onClick={() => {
            QuizHandler.setMeta("activePage", question.page)
            QuizHandler.setMeta("activeQuestion", question.qindex)
            QuizHandler.update({ collapse: false }, { collapse: true })
            QuizHandler.update({ collapse: true }, question._id)
            setTimeout(() => {
               const QEle = document.getElementById(`q${question.qindex}`)
               if (QEle) {
                  QEle.scrollIntoView({ behavior: "smooth" })
               }
            }, 100);
         }}
      >
         {isVisible && qindex}
         {(isVisible && question.value) ? <span style={{
            left: "6px",
            width: "8px",
            bottom: "1px",
            height: "2px",
            position: "absolute",
            background: !active ? "#333" : "#fff"
         }}></span> : ""}
      </ButtonBase>
   )
}

export default NavigateButton