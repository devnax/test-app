import React from 'react'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/ButtonBase'
import styled from '@emotion/styled'
import progressIcon from '../Images/GED_Progress.png'
import ReportFactory from '@src/Partials/QuizRunner/handlers/ReportFactory'
import { ReportFactoryProps } from '@src/Partials/QuizRunner/handlers/ReportFactory'
import mathIcon from '../Images/math-icon.jpg'
import rlaIcon from '../Images/rla-icon.jpg'
import socialIcon from '../Images/social-icon.jpg'
import scienceIcon from '../Images/science-icon.jpg'
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


export const GEDReportBox = (props: Partial<ReportFactoryProps>) => {

   const {
      color,
      quiz_type,
      course_type,
      title,
      isReadyMock,
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
   const isGED = course_type.toUpperCase() == 'GED'
   const isForGed = isReadyMock && isGED

   let icons: any = {
      "MATH": mathIcon.src,
      "RLA": rlaIcon.src,
      "SCIENCE": scienceIcon.src,
      "SOCIAL STUDIES": socialIcon.src,
   }
   let icon: any = icons[quiz_type.toUpperCase()]

   let passTitle = ''
   let passTitleColor = ''
   if (isForGed) {
      if (score <= 134) {
         passTitle = 'Not Likely to Pass'
         passTitleColor = "red"
      } else if (score <= 145) {
         passTitle = 'Too Close to Call'
         passTitleColor = "orange"
      } else if (score > 145) {
         passTitle = 'Likely to Pass'
         passTitleColor = "green"
      }
   }

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
      <Grid container>

         <Grid item md={3} xs={12}
            justifyContent="center"
            alignItems="flex-start"
            display="flex"
         >
            <Stack
               borderRadius={2}
               boxShadow={1}
               overflow="hidden"
               mb={3}
               width={220}
            >
               <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  bgcolor={color}
                  p={1}
               >
                  <Typography
                     color="#fff"
                     fontWeight={500}
                  >
                     {quiz_type}
                  </Typography>
                  {
                     icon && <picture>
                        <img src={icon} alt="" />
                     </picture>
                  }

               </Stack>
               <Stack
                  height={120}
                  alignItems="center"
                  justifyContent="center"
                  mb={1}
               >
                  <Stack
                     width={100}
                     height={100}
                     bgcolor="grey.200"
                     borderRadius="100%"
                     alignItems="center"
                     justifyContent="center"
                  >
                     <Typography variant="h3" color="#333">
                        {score}
                     </Typography>
                  </Stack>
               </Stack>
               {
                  isForGed && <Typography variant="body1" color={passTitleColor} textAlign="center" pb={1}>
                     {
                        passTitle
                     }
                  </Typography>
               }

               {
                  props.quiz && <Stack
                     p={1}
                     mb={1}
                     direction="row"
                     alignItems="center"
                     justifyContent="center"
                  >
                     <Button
                        disableRipple
                        sx={{
                           borderRadius: 3,
                           color,
                           border: 1,
                           borderColor: "divider",
                           p: 2,
                           py: 1,
                           fontWeight: 600
                        }}
                        onClick={() => loadReport()}
                     >
                        Score Report
                     </Button>
                  </Stack>
               }
            </Stack>
         </Grid>
         <Grid item md={9} xs={12}>
            <Stack px={2}>
               <Typography variant="h6" color="initial" mb={1.5}>{title}</Typography>
               {
                  (isForGed && props.quiz) && <picture>
                     <img width="100%" src={progressIcon.src} alt="" />
                  </picture>
               }

               <Stack>
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
                           borderRadius: 3,
                           color,
                           border: 1,
                           borderColor: "divider",
                           p: 2,
                           py: 1,
                           fontWeight: 600
                        }}
                        onClick={() => {
                           loadReport()
                        }}
                     >
                        View Detail Score Report
                     </Button>
                  </Stack>
               }

            </Stack>
         </Grid>
      </Grid>
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
      <Scrollbar>
         <Container maxWidth="md" sx={{ pt: 10 }}>
            <Stack mb={4} direction="row" alignItems="center" justifyContent="space-between">
               <Typography variant="h5" >Score Reports</Typography>
               <Button
                  disableRipple
                  sx={{
                     borderRadius: 3,
                     border: 1,
                     borderColor: "divider",
                     p: 2,
                     py: 1.5,
                     fontWeight: 600
                  }}
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
            <Stack spacing={3}>
               {
                  factories.map((factory, idx) => <GEDReportBox key={idx} {...factory} />)
               }
            </Stack>
         </Container>
      </Scrollbar>
   )
}

export default ReportScreen