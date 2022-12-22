import QuizHandler from '@src/Partials/QuizRunner/handlers/QuizHandler'
import React from 'react'
import nextprevIcon from '../Images/next-prev-btn.png'

const NextButton = () => {
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
         }}

         onClick={() => {

            const currentIndex = QuizHandler.getMeta("activeQuestion") as number
            const next = QuizHandler.findFirst({ qindex: currentIndex + 1 })
            if (next) {
               QuizHandler.setMeta("activePage", next.page)
               QuizHandler.setMeta("activeQuestion", next.qindex)
               QuizHandler.update({ collapse: false }, { collapse: true })
               QuizHandler.update({ collapse: true }, next._id)
               setTimeout(() => {
                  const QEle = document.getElementById(`q${next.qindex}`)
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

export default NextButton