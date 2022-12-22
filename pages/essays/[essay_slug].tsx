import React, { useEffect, useState } from 'react'
import Layout from '@src/Partials/Layout'
import { useRouter } from 'next/router'
import { withStore } from 'state-range'
import { Post, PostRouter } from '@src/Routers'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import * as piece from 'json-piece'

interface EssayContentProps {
   content: string,
   graded: false | number, // number
   feedback: "",
   available_point: number,
   comments: { [spanId: string]: string },
   scores: {
      [key: string]: {
         score: number;
         content: string
      };
   },
   question: string,
   reportGroupId: number, // id will be update in QuizHandler
   quiz_id: number;
   markedContent: string;
   grade: number;
   score_type: "ielts_task1" | "ielts_task2" | "none";
   graded_by: number | null
}


type EssayPost = Omit<Post, "content"> & { content: EssayContentProps }



const ScoreRow = ({ title, score, content }: { title: string; score: number; content: string }) => {
   return (
      <TableRow>
         <TableCell >
            <Stack direction="row" justifyContent="space-between" alignItems="center" py={1}>
               <Typography variant="h6" >{title}</Typography>
               <Typography variant="h6" >{score}</Typography>
            </Stack>
         </TableCell>
         <TableCell >
            {content}
         </TableCell>
      </TableRow>
   )
}

const ScoreTable = (essay: EssayPost) => {
   const scores = essay.content.scores

   return (
      <TableContainer sx={{ borderRadius: 2, border: 1, borderColor: "divider", bgcolor: "rgba(254, 233, 174, .1)" }}>
         <Table size="small" sx={{
            '& td': {
               borderRight: 1,
               borderColor: "divider",
            },
            '& td:last-child': {
               borderRight: 0
            },
            '& tr:last-child td': {
               borderBottom: 0
            },
            '& tr:last-child': {
               bgcolor: "rgba(254, 233, 174, .3)"
            }
         }} >
            <TableHead>
               <TableRow>
                  <TableCell>Score</TableCell>
                  <TableCell >Feedback</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {
                  Object.keys(scores).map(title => {
                     const score = scores[title]
                     return <ScoreRow key={title} title={title} score={score.score} content={score.content} />
                  })
               }
               <TableRow >
                  <TableCell >
                     <Stack direction="row" justifyContent="space-between" alignItems="center" py={1}>
                        <Typography variant="h6" color="#333">Total Score</Typography>
                        <Typography variant="h6" color="#333">{essay.content.grade}/{essay.content.available_point}</Typography>
                     </Stack>
                  </TableCell>
                  <TableCell >
                     <div dangerouslySetInnerHTML={{
                        __html: essay.content.feedback.replace(/\n/, "<br/>")
                     }} />
                  </TableCell>
               </TableRow>
            </TableBody>
         </Table>
      </TableContainer>
   );
}


interface CommentCardProps {
   active?: boolean;
   comment: string;
   id: string;
   onClick: () => void
}

const CommentCard = ({ id, comment, active, onClick }: CommentCardProps) => {
   return (
      <Stack
         data-comment={id}
         borderRadius={2}
         border={1}
         borderColor={active ? "primary.main" : "divider"}
         boxShadow={active ? 1 : 0}
         p={2}
         spacing={1}
         sx={{ cursor: "pointer" }}
         onClick={onClick}
      >
         <Typography variant="h6" color={active ? "primary.main" : "body1"}>Comment</Typography>
         <Typography variant="body1" >{comment}</Typography>
      </Stack>
   )
}


const SingleCourse = () => {
   const router = useRouter()
   const { essay_slug } = router.query
   const [target, setTarget] = useState("")
   const [essay, setEssay] = useState<EssayPost>()

   useEffect(() => {
      if (essay_slug) {
         (async () => {
            const find = await PostRouter.find({
               slug: essay_slug as string
            })
            if (find) {
               const essay = find[0]
               essay.content = piece.parse(essay.content as any)
               setEssay(essay as any)
            }
         })();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [essay_slug])

   useEffect(() => {
      if (target) {
         const spans: NodeListOf<HTMLElement> = document.querySelectorAll(`[data-mark]`)
         for (let span of spans) {
            span.classList.remove("active")
         }
         const targetSpan = document.querySelector(`[data-mark="${target}"]`) as HTMLSpanElement
         if (targetSpan) {
            targetSpan.scrollIntoView({ behavior: "smooth" })
            targetSpan.classList.add("active")
         }
      }

   }, [target])

   useEffect(() => {
      const spans: NodeListOf<HTMLElement> = document.querySelectorAll(`[data-mark]`)
      for (let span of spans) {
         const id = span.getAttribute("data-mark")
         span.onclick = () => id && setTarget(id)
      }
   }, [essay])


   return (
      <Layout title={essay?.title}>
         <Stack

            sx={{
               '& [data-mark].active': {
                  background: "#f1c959!important"
               }
            }}
         >
            {
               (!essay || !essay.content.graded) && <Container sx={{ minHeight: 500, py: 10 }}>
                  <Typography variant="h1" fontSize={25} mb={1}>{essay?.title}</Typography>
                  <Typography variant="h4" fontSize={25} mb={1}>Not Graded Yet</Typography>
               </Container>
            }

            {
               (essay && essay.content.graded) && <Container>
                  <Stack bgcolor="background.paper" borderRadius={2} py={4} px={3} my={3} spacing={3}>
                     <Typography variant="h2" fontSize={25} mb={1}>{essay.title}</Typography>
                     <ScoreTable {...essay} />
                     <Typography variant="body1" fontWeight={600}>Click on the highlighted texts to view the instructor&apos;s comments</Typography>

                     <Grid
                        container
                     >
                        <Grid item xs={12} md={8} p={1} >
                           <Stack p={2} borderRadius={2} border={1} borderColor="divider">
                              <div dangerouslySetInnerHTML={{
                                 __html: essay.content.markedContent
                              }} />
                           </Stack>
                        </Grid>
                        <Grid item xs={12} md={4} p={1} >
                           <Stack px={2} spacing={1}>
                              {
                                 Object.keys(essay.content.comments).map(id => {
                                    const comment = essay.content.comments[id]
                                    return <CommentCard
                                       key={id}
                                       active={target === id}
                                       id={id}
                                       comment={comment}
                                       onClick={() => {
                                          setTarget(id)
                                       }}
                                    />
                                 })
                              }
                           </Stack>
                        </Grid>
                     </Grid>
                  </Stack>
               </Container>
            }
         </Stack>
      </Layout>
   )
}


export default withStore(SingleCourse) 