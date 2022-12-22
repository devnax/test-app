import React from 'react'
import gedSheet from '../Images/GED_Formula_Sheet_Final.webp'
import satSheet from '../Images/SAT_FORMULA_SHEET.png'
import QuizHandler from "@src/Partials/QuizRunner/handlers/QuizHandler"

const FormulaSheet = () => {

   const settings = QuizHandler.getMeta("settings")
   const isGed = settings?.course_type === "GED"

   return (
      <div>
         <picture>
            <img width="100%" src={isGed ? gedSheet.src : satSheet.src} alt="Formula Sheet" />
         </picture>
      </div>
   )
}

export default FormulaSheet