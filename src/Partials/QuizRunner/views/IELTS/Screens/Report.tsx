import React from 'react'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Button from '../components/ShadowButton'
import styled from '@emotion/styled'
import ReportFactory from '@src/Partials/QuizRunner/handlers/ReportFactory'
import { ReportFactoryProps } from '@src/Partials/QuizRunner/handlers/ReportFactory'
import { getFullscreen } from '@src/Partials/QuizRunner/helpers/useFullscreen'
import { ReportInfoProps } from '@src/Partials/QuizRunner/handlers/ReportGenerate'
import QuizHandler from '@src/Partials/QuizRunner/handlers/QuizHandler'
import { Post } from '@src/Routers'
import DragDropHandler from '@src/Partials/QuizRunner/handlers/DragDropHandler'
import Scrollbar from '@libs/Scrollbar'


const Table = styled.table({
   borderCollapse: "separate",
   borderSpacing: "0",
   '& th, & td': {
      fontSize: 17,
      padding: 2,
      borderBottom: '1px solid #eee'
   }
})

const Tr = ({ title, val }: { title: string, val: number | string }) => {
   return (
      <tr>
         <td>
            <Typography variant="h6" color="initial" >{title}</Typography>
         </td>
         <td>
            <Typography variant="h6" color="initial" textAlign="right">
               {val}
            </Typography>
         </td>
      </tr>
   )
}


export const IELTSReportBox = (props: Partial<ReportFactoryProps>) => {

   const {
      title,
      score,
      time,
      total_point,
      correct,
      incorrect,
      questions,
      draggables,
      essays
   } = props.reports as ReportInfoProps

   const totalQuestion = correct + incorrect

   const loadReport = () => {
      QuizHandler.loadQuiz(props.quiz as Post)
      QuizHandler.setMeta("screen", "quiz")
      QuizHandler.setMeta("reportMode", true)
      const allques = QuizHandler.findAll()
      const alldragables = DragDropHandler.findAll()

      allques.forEach((q, idx) => {
         QuizHandler.update({
            ...(questions[idx])
         }, q._id)
      })

      alldragables.forEach((q, idx) => {
         DragDropHandler.update({
            ...(draggables[idx])
         }, q._id)
      })
   }


   return (
      <Stack bgcolor="#fff" p={2} borderRadius={2} borderTop={5} borderBottom={5} borderColor="#333">
         <Stack px={2}>
            <Typography variant="h4" mb={1.5}>{title}</Typography>
            <Stack mt={3}>

               <Stack my={2} justifyContent="center" textAlign="center" spacing={1}>
                  <Typography variant="h3" fontWeight={500}  >Your IELTS Percentage Score</Typography>
                  <Typography variant="h1"  >{score}</Typography>
                  <Typography variant="body1" fontSize={18} >Score</Typography>
               </Stack>

               <Table>
                  <tbody>
                     <Tr title="Correct:" val={`${correct}/${totalQuestion}`} />
                     <Tr title="Incorrect:" val={`${incorrect}/${totalQuestion}`} />
                     <Tr title="Time:" val={time || "-:-"} />
                     <Tr title="Score:" val={`${score}/${total_point}`} />
                  </tbody>
               </Table>
               {
                  !!essays?.length && <Stack mt={2}>
                     <Typography variant="body1" >Submited Essays</Typography>
                     <ul>
                        {
                           essays.map(essay => <li key={essay.slug}>
                              <MuiLink
                                 sx={{ cursor: "pointer" }}
                                 target="_blank"
                                 href={process.env.NEXT_PUBLIC_HOME_URL + "/essays/" + essay.slug}
                              >
                                 {essay.title}
                              </MuiLink>
                           </li>)
                        }
                     </ul>
                  </Stack>
               }

            </Stack>
            {
               props.message && <Typography variant="body1" color="initial" mt={2}
                  dangerouslySetInnerHTML={{ __html: props.message }}
               />
            }
            {
               props.quiz && <Stack
                  p={1}
                  mt={3}
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
               >
                  <Button
                     disableRipple
                     sx={{
                        bgcolor: "#E31837",
                        color: "#fff",
                        p: 1.5
                     }}
                     onClick={() => {
                        loadReport()
                     }}
                  >
                     View Questions
                  </Button>
               </Stack>
            }

         </Stack>
      </Stack>
   )
}


const ReportScreen = () => {
   const fullscreen = getFullscreen("quiz")
   const factories = Array.from(ReportFactory.values())
   const first = factories[0]

   let totalPoints = 0
   let totalScore = 0
   if (first.reports?.course_type === 'SAT') {
      for (let factory of factories) {
         totalPoints += factory.reports?.total_point || 0
         totalScore += factory.reports?.score || 0
      }
   }

   return (
      <Stack height="100%" bgcolor="#dce5f6">
         <Scrollbar>
            <Container maxWidth="md" sx={{ pt: 5 }}>
               <Stack mb={4} direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h3" >Score Reports</Typography>
                  <Button
                     onClick={() => {
                        fullscreen && fullscreen.exit()
                        window.location.reload()
                     }}
                  >
                     Finish the test
                  </Button>
               </Stack>
               {
                  first.reports?.course_type === 'SAT' && <Stack mb={3} bgcolor="#fff" borderRadius={2} p={2} direction="row" alignItems="center" justifyContent="space-between">
                     <Typography variant="h3" >Your SAT band score:</Typography>
                     <Typography variant="h3" >{totalScore}/{totalPoints}</Typography>
                  </Stack>
               }

               <Stack spacing={3} mb={2}>
                  {
                     factories.map((factory, idx) => <IELTSReportBox key={idx} {...factory} />)
                  }
               </Stack>

            </Container>
         </Scrollbar>
      </Stack>
   )
}

export default ReportScreen