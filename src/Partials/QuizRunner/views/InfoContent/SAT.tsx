import React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import QuizHandler from "@src/Partials/QuizRunner/handlers/QuizHandler"
import { getTimer } from '@src/Partials/QuizRunner/helpers/useTimer'



const MathReady = () => {
   return (
      <Stack spacing={2}>
         <ul>
            <li><strong>No Calculator</strong></li>
            <li>Questions 1-20 are &lsquo;no calculator&rsquo; math questions</li>
            <li>You are not permitted to use a calculator while answering these questions.</li>
            <li>For questions 1-15, solve each problem and choose the best answer from the answer choices. For questions 16-20, solve the problem and enter your answer in the given space.</li>
         </ul>
         <ul>
            <li><strong>Calculator</strong></li>
            <li>Questions 21-58 are &lsquo;with calculator&rsquo; math questions</li>
            <li>The use of a calculator is permitted.</li>
            <li>For questions 21-50, solve each problem and choose the best answer from the answer choices. For questions 51-58, solve the problem and enter your answer in the given space.</li>
         </ul>
      </Stack>
   )
}

const ReadingReady = () => {
   return (
      <Typography variant="body1" color="#000" >Each passage or pair of passages below is followed by a number of questions. After reading each passage or pair, choose the best answer to each question based on what is stated or implied in the passage or passages and in any accompanying graphics (such as a table or graph</Typography>
   )
}

const WritingReady = () => {

   return (
      <Stack spacing={4} >
         <Typography variant="body1" color="#000" >
            Each passage below is accompanied by a number of questions. For some questions, you will consider how the passage might be revised to improve the expression of ideas. For other questions, you will consider how the passage might be edited to correct errors in <b>sentence structure, usage, or punctuation</b>. A passage or a question may be accompanied by one or more graphics (<b>such as a table or graph</b>) that you will consider as you make revising and editing decisions.
         </Typography>
         <Typography variant="body1" color="#000" >
            Some questions will direct you to an <b>underlined portion of a passage</b>. Other questions will direct you to a location in a passage or ask you to <b>think about the passage as a whole</b>.
         </Typography>
         <Typography variant="body1" color="#000" >
            After reading each passage, choose the answer to each question that most effectively improves the quality of writing in the passage or that makes the passage conform to the conventions of standard written English. Many questions include a
         </Typography>
         <Typography variant="body1" color="#000" >
            <b>“NO CHANGE”</b> option. Choose that option if you think the best choice is to leave the relevant portion of the passage as it is.
         </Typography>
      </Stack>
   )
}

const EssayReady = () => {
   const quiz = QuizHandler.getQuizPost()
   const timer = getTimer(quiz.id)
   const time = timer?.getTime()

   return (
      <Stack>
         {time && <Typography variant="h6" >You should spend about {(time.initialTime.milliseconds / 1000) / 60} min to complete the test.</Typography>}
      </Stack>
   )
}


const SAT = () => {
   const quiz = QuizHandler.getQuizPost()
   const settings = QuizHandler.getSettings()
   const allQuestions = QuizHandler.findAll()
   const isReady = settings.isReadyMock
   const timer = getTimer(quiz.id)
   const time = timer?.getTime()
   const quiz_type = settings.quiz_type
   let tmp = <></>
   switch (quiz_type) {
      case 'Evidence Based Reading':
         tmp = <ReadingReady />
         break;
      case 'Writing & Language':
         tmp = <WritingReady />
         break;
      case 'Quantitative Reasoning':
         tmp = <MathReady />
         break;
      case 'Essay':
         tmp = <EssayReady />
         break;
   }

   return (
      <Stack mb={7} maxWidth={900}>
         <Typography variant='h3' mb={2}>SAT Math- Practice Test&nbsp;1</Typography>
         {
            isReady ? <>
               <Typography variant="h5" mb={4}>
                  {time && ((time.initialTime.milliseconds / 1000) / 60) + " MINUTES,"} {allQuestions.length} QUESTIONS
               </Typography>
               <Typography variant="h6" mb={3}>DIRECTIONS</Typography>
               {tmp}
            </> : <>
               <Typography variant="body1" color="#000" mb={2}>Read the following questions based on the contents discussed in the current lesson, and then choose the correct answers from the options. There can be only one correct answer for each question</Typography>
               <Typography variant="h6" mb={2}>
                  Total Questions: {allQuestions.length}
               </Typography>
               {
                  time && <Typography variant="h6">
                     Time limit: {(time.initialTime.milliseconds / 1000) / 60} minutes
                  </Typography>
               }
            </>
         }

      </Stack>
   )
}

export default SAT