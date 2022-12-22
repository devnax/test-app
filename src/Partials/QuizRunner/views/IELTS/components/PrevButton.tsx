import QuizHandler from '@src/Partials/QuizRunner/handlers/QuizHandler'
import React from 'react'
import nextprevIcon from '../Images/next-prev-btn.png'

const PrevButton = () => {
   return (
      <button
         style={{
            width: "56px",
            border: "none",
            height: "56px",
            padding: "0",
            background: "transparent",
            borderRadius: "56px",
            backgroundSize: "auto",
            backgroundImage: `url(${nextprevIcon.src})`,
            backgroundRepeat: "no-repeat",
            cursor: "pointer",
            backgroundPosition: "0 100%"
         }}

         onClick={() => {
            const currentIndex = QuizHandler.getMeta("activeQuestion") as number
            const prev = QuizHandler.findFirst({ qindex: currentIndex - 1 })
            if (prev) {
               QuizHandler.setMeta("activePage", prev.page)
               QuizHandler.setMeta("activeQuestion", prev.qindex)
               QuizHandler.update({ collapse: false }, { collapse: true })
               QuizHandler.update({ collapse: true }, prev._id)
               setTimeout(() => {
                  const QEle = document.getElementById(`q${prev.qindex}`)
                  if (QEle) {
                     QEle.scrollIntoView({ behavior: "smooth" })
                  }
               }, 100);
            }
         }}
      >

      </button>
   )
}

export default PrevButton