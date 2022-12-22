import React from 'react'
import { Stack, Link, Typography } from '@mui/material'
import styled from '@emotion/styled'
import QuizHandler from "@src/Partials/QuizRunner/handlers/QuizHandler"
import flagIcon from '../Images/review_list_flag_on.png'
import flagEmptyIcon from '../Images/review_list_flag.webp'
import Layout from '../Layout'


const Table = styled.table({
   border: '1px solid #eee',
   borderCollapse: "separate",
   borderSpacing: "0",
   '& th, & td': {
      fontSize: 17,
      padding: 4,
      borderBottom: '1px solid #eee'
   }
})

const Navigation = () => {
   const questions = QuizHandler.findAll()
   const unanswered = QuizHandler.find({ value: null })
   return (
      <Layout
         containerProps={{
            px: 0
         }}
      >
         <Stack bgcolor="#fff" height="100%">
            <Stack pt={4} pb={3}>
               <Typography textAlign="center">Question Review Screen</Typography>
            </Stack>
            <Stack
               height={35}
               bgcolor="#80AEE1"
               direction="row"
               alignItems="center"
               justifyContent="flex-end"
               spacing={1.5}
               px={1}
               mb={1.5}
            >
               <Typography textAlign="center" color="#fff">({questions.length} Questions, {unanswered.length} not answered)</Typography>
            </Stack>
            <Table>
               <tbody>
                  {
                     questions.map(q => {
                        const activeQuestion = QuizHandler.findById(q._id)
                        return (
                           <tr key={q._id}>
                              <td width={45}>
                                 <Link
                                    underline="none"
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => {
                                       QuizHandler.update({ flagged: !q.flagged }, q._id)
                                    }}
                                 >
                                    <picture>
                                       <img src={activeQuestion?.flagged ? flagIcon.src : flagEmptyIcon.src} alt="" />
                                    </picture>
                                 </Link>
                              </td>
                              <td width={300}>
                                 <Link
                                    underline="none"
                                    sx={{
                                       color: "inherit",
                                       cursor: "pointer",
                                       userSelect: "none",
                                       '&:hover': {
                                          color: "#004de5"
                                       }
                                    }}
                                    onClick={() => {
                                       QuizHandler.setMeta("screen", "quiz")
                                       QuizHandler.setMeta("activePage", q.page)
                                       QuizHandler.setMeta("activeQuestion", q.qindex)
                                       QuizHandler.update({ seen: true }, q._id)
                                    }}
                                 >
                                    Question {q.qindex}
                                 </Link>
                              </td>
                              <td>
                                 <Typography variant="body1" color={q.value !== null ? "inherit" : "red"}>
                                    {
                                       q.value !== null ? "Answered" : "Unanswered"
                                    }
                                 </Typography>
                              </td>

                           </tr>
                        )
                     })
                  }
               </tbody>
            </Table>
         </Stack>
      </Layout>
   )
}

export default Navigation