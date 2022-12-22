import React from 'react'
import Layout from '../Layout'
import Renderar from '../Renderar'
import QuizHandler from "@src/Partials/QuizRunner/handlers/QuizHandler"
import { DraggableWrapper } from 'react-draghost'

const QuizScreen = () => {
   const quiz = QuizHandler.getQuizPost()
   const quizData = QuizHandler.getQuizData()
   const pageIndex = QuizHandler.getMeta("activePage")
   const pageContent = quizData[pageIndex || 0].childs

   return (
      <Layout>
         <DraggableWrapper
            id={"wrapper_" + quiz.id.toString()}
         >
            <>
               {
                  Renderar.render(pageContent as any)
               }
            </>
         </DraggableWrapper>
      </Layout>
   )
}

export default QuizScreen