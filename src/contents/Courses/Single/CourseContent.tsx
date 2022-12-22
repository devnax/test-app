import React, { useMemo } from 'react'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Sidebar from './Sidebar'
import Container from '@mui/material/Container'
import ContentRender from '@cmp/ContentRender'
import { SinglePageCompProps } from './types'
import Button from '@mui/material/Button'
import MarkIcon from '@mui/icons-material/DoneAllRounded';
import LearnActivity from '@src/Routers/LearnActivity'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import NoSSR from '@mui/material/NoSsr'
import ReactPlayer from 'react-player'
import Enroll from '@src/Routers/Enroll'
import System from '@src/System'
import QuizRunner from '@src/Partials/QuizRunner'
import QuizReports from './QuizReports'
import Auth from '@src/System/Auth'

const CourseContent = (props: SinglePageCompProps) => {
   const router = useRouter()
   const auth = Auth.getAuth()
   const { course, topic, update } = props
   const enrolled: any = course.enrolled

   const renderedContent = useMemo(() => ContentRender.set((topic ? topic.content : course.content as any) || []), [course.content, topic])

   return (
      <Stack py={2} pb={5} bgcolor="background.paper">
         <Container maxWidth="lg">
            <Grid container>
               <Grid item xs={12} md={8} pr={{ xs: 0, md: 2 }}>
                  {
                     (topic && enrolled) && <Stack
                        mb={1}
                        p={.4}
                        bgcolor="background.default"
                        borderRadius={2}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                     >
                        <Stack>
                           {
                              !course.completed_topics?.includes(topic.id) ? <Button
                                 size="small"
                                 startIcon={<MarkIcon />}
                                 onClick={async () => {
                                    const user_courses = await System.getUserCoursesInfo()
                                    const created = await LearnActivity.create({
                                       enroll_id: enrolled.id,
                                       topic_id: topic.id
                                    })
                                    if (created) {
                                       const total = course.count_lectureItems.quizes + course.count_lectureItems.topics
                                       const completed_topics = [...course.completed_topics, created.topic_id]
                                       const progress = (100 / total) * completed_topics.length

                                       await Enroll.update({
                                          progress,
                                          user_id: auth?.id,
                                       }, {
                                          course_id: course.id,
                                          user_id: auth?.id
                                       })

                                       System.setMeta("user_courses", user_courses?.map((enroll: any) => {
                                          if (enroll.course_id === course.id) {
                                             enroll.progress = progress
                                          }
                                          return enroll
                                       }) || [] as any)
                                       update({
                                          enrolled: {
                                             ...course.enrolled,
                                             progress
                                          } as any,
                                          completed_topics
                                       })
                                    }
                                 }}
                              >
                                 Mark as complete
                              </Button> : <Typography variant="body2" fontWeight={600} color="success.main">Completed</Typography>
                           }

                        </Stack>
                        <Stack direction="row" spacing={.1}>
                           <Button
                              size="small"
                              sx={{ fontSize: 13 }}
                              onClick={() => {
                                 let found = false;
                                 for (let l = 0; l < course.course_outline.length; l++) {
                                    const lesson = course.course_outline[l]
                                    if (found) {
                                       break
                                    }
                                    for (let i = 0; i < lesson.items.length; i++) {
                                       const item: any = lesson.items[i]
                                       if (router.query.topic_slug === item.slug) {
                                          let prev: any = lesson.items[i - 1]
                                          found = true;
                                          if (!prev) {
                                             const prevLesson = course.course_outline[l - 1]
                                             prev = prevLesson?.items[prevLesson?.items.length - 1]
                                          }
                                          prev && router.push(`/course/${router.query.slug}/${prev.slug}`)
                                          break;
                                       }
                                    }
                                 }
                              }}
                           >
                              PREV
                           </Button>
                           <Button
                              size="small"
                              sx={{ fontSize: 13 }}
                              onClick={() => {
                                 let found = false;
                                 for (let l = 0; l < course.course_outline.length; l++) {
                                    const lesson = course.course_outline[l]
                                    if (found) {
                                       break
                                    }
                                    for (let i = 0; i < lesson.items.length; i++) {
                                       const item: any = lesson.items[i]
                                       if (router.query.topic_slug === item.slug) {
                                          let next: any = lesson.items[i + 1]
                                          found = true;
                                          if (!next) {
                                             const nextLesson = course.course_outline[l + 1]
                                             next = nextLesson?.items[0]
                                          }
                                          next && router.push(`/course/${router.query.slug}/${next.slug}`)
                                          break;
                                       }
                                    }
                                 }
                              }}
                           >
                              NEXT
                           </Button>
                        </Stack>
                     </Stack>
                  }
                  <Stack spacing={4}>
                     {
                        (topic && topic.thumbnail) && <Stack>
                           <NoSSR>
                              {
                                 topic.thumbnail.type === 'video' ? <Stack
                                    position="relative"
                                    pt={"56.25%"}
                                    sx={{
                                       '&>div': {
                                          position: "absolute",
                                          top: 0,
                                          left: 0,
                                       }
                                    }}
                                 >
                                    <ReactPlayer
                                       url={topic.thumbnail.url}
                                       controls
                                       width="100%"
                                       height="100%"
                                    />
                                 </Stack> : <picture>
                                    <img src={topic.thumbnail.url} alt={topic.title} width="100%" />
                                 </picture>
                              }

                           </NoSSR>
                        </Stack>
                     }
                     {renderedContent}
                     {
                        (topic?.type === "quiz" && !!topic.quiz_reports?.length) && <QuizReports
                           reports={topic.quiz_reports}
                           courseId={course.id}
                        />
                     }

                     {
                        topic?.type === "quiz" && <Stack direction="row" justifyContent="center" alignItems="center">
                           <QuizRunner quiz={topic as any} courseId={course.id} />
                        </Stack>
                     }
                  </Stack>
               </Grid>
               <Grid item xs={12} md={4}>
                  <Sidebar {...props} />
               </Grid>
            </Grid>
         </Container>
      </Stack>
   )
}

export default CourseContent