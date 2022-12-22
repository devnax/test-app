import React from 'react'
import { Stack, Link, Typography } from '@mui/material'
import styled from '@emotion/styled'
import QuizHandler from "@src/Partials/QuizRunner/handlers/QuizHandler"
import flagIcon from '../Images/review_list_flag_on.png'
import Button from '../components/Button'

const THead = styled.thead({
   background: '#80AEE1',
   color: "#fff"
})

const Table = styled.table({
   border: '1px solid #eee',
   borderCollapse: "separate",
   borderSpacing: "0",
   '& th, & td:last-child': {
      textAlign: 'center'
   },
   '& th, & td': {
      fontSize: 17,
      padding: 4,
      border: '1px solid #eee'
   }
})

const Navigation = () => {
   const questions = QuizHandler.findAll()
   const reportMode = QuizHandler.getMeta("reportMode")
   const unanswered = QuizHandler.find({ value: null })

   return (
      <Stack height="100%">
         <Stack
            height={600}
            overflow="auto"
            bgcolor="#fff"
         >
            <Table>
               <THead>
                  <tr>
                     <th>Questions #</th>
                     <th>Status</th>
                     <th>Flagged for review </th>
                  </tr>
               </THead>
               <tbody>
                  {
                     questions.map(q => {
                        const activeQuestion = QuizHandler.findById(q._id)
                        return (
                           <tr key={q._id}>
                              <td>
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
                                       QuizHandler.setMeta("activePage", q.page)
                                       QuizHandler.setMeta("activeQuestion", q.qindex)
                                       !reportMode && QuizHandler.update({ seen: true }, q._id)
                                       QuizHandler.setMeta("showModal", {
                                          content: <Navigation />,
                                          title: "Navigation",
                                          height: 500,
                                          width: 800
                                       })
                                    }}
                                 >
                                    Question {q.qindex}
                                 </Link>
                              </td>
                              <td>
                                 <Typography variant="body1" color={q.value !== null ? "inherit" : "red"}>
                                    {
                                       !q.seen ? "Unseen" : <>
                                          {
                                             q.value !== null ? "Complete" : "Incomplete"
                                          }
                                       </>
                                    }
                                 </Typography>
                              </td>
                              <td>
                                 {
                                    activeQuestion?.flagged && <picture>
                                       <img src={flagIcon.src} alt="" />
                                    </picture>
                                 }
                              </td>
                           </tr>
                        )
                     })
                  }
               </tbody>
            </Table>
         </Stack>
         <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
            <Typography variant="body1" color="#fff">{unanswered.length} Unseen/Incomplete</Typography>
            <Button onClick={() => QuizHandler.deleteMeta("showModal")}>Close</Button>
         </Stack>
      </Stack>
   )
}

export default Navigation