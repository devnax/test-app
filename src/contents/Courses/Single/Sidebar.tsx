import React, { useEffect } from 'react'
import Stack from '@mui/material/Stack'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VideoIcon from '@mui/icons-material/PlayCircleFilledRounded';
import QuizIcon from '@mui/icons-material/FactCheckRounded';
import UnlockIcon from '@mui/icons-material/LockOpenOutlined';
import { useRouter } from 'next/router'
import Auth from '@src/System/Auth'
import { SinglePageCompProps } from './types'
import BackIcon from '@mui/icons-material/ArrowBackRounded';
import IconButton from '@mui/material/IconButton'
import CourseProgress from '@src/Partials/Courses/CourseProgress'

interface lessonItemProps extends SinglePageCompProps {
   divider?: boolean;
   lesson: {
      title: string;
      items: any[],
      props: {
         sample_lesson: "yes" | "no"
      }
   };
   items?: ({
      title: string;
      slug?: string;
      type: "topic" | "quiz"
   })[]
}

const LessonItem = ({ course, update, lesson, divider }: lessonItemProps) => {
   const router = useRouter()
   const auth = Auth.getAuth()
   const isFreeLesson = lesson.props.sample_lesson === 'yes'
   const currentSlug = router.query.topic_slug


   useEffect(() => {
      const c = lesson.items.find((f: any) => f.slug === currentSlug)
      if (c) {
         update({
            course_outline: course.course_outline.map((l: any) => {
               if (lesson.title === l.title) {
                  l.expanded = true
               }
               return l
            })
         })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [router.query.topic_slug])

   return (
      <>
         <Accordion
            expanded={(lesson as any).expanded ? true : false}

            disableGutters
            elevation={0}
            sx={{
               bgcolor: "transparent",
               '&:before': {
                  display: "none"
               }
            }}
         >
            <AccordionSummary
               expandIcon={<ExpandMoreIcon />}
               onClick={() => {
                  update({
                     course_outline: course.course_outline.map((l: any) => {
                        if (lesson.title === l.title) {
                           l.expanded = !l.expanded
                        }
                        return l
                     })
                  })
               }}
            >
               <Typography variant="h6" fontWeight={500} fontSize={15} sx={{ color: "#333" }}>{lesson.title}</Typography>
            </AccordionSummary>
            {
               lesson.items && <AccordionDetails sx={{ p: 0 }}>
                  <List>
                     {
                        lesson.items.map((item, idx) => {
                           const isComplete = course.completed_topics?.includes(item.id)
                           let activeColor = 'primary.main'
                           if (isComplete) {
                              activeColor = 'success.main'
                           }
                           if (currentSlug === item.slug) {
                              activeColor = 'primary.main'
                           }

                           return <ListItemButton
                              key={idx}
                              onClick={() => {
                                 if (!isFreeLesson && !auth) {
                                    router.push(`/auth?redirect=/course/${course.slug}/${item.slug}`)
                                 } else if (course.enrolled || isFreeLesson) {
                                    router.push(`/course/${course.slug}/${item.slug}`)
                                 }
                              }}
                              sx={{
                                 py: 0,
                                 "& svg, & span": {
                                    color: (currentSlug === item.slug || isComplete) ? activeColor : "#444"
                                 },
                                 '&:hover': {
                                    "& svg, & span": {
                                       color: isFreeLesson || course.enrolled ? activeColor : "#444"
                                    },
                                 }
                              }}
                           >
                              <ListItemIcon sx={{ minWidth: 34 }}>
                                 {
                                    item.type === 'quiz' ? <QuizIcon sx={{
                                       fontSize: "22px!important",
                                    }} /> : <VideoIcon sx={{
                                       fontSize: "22px!important",
                                    }} />
                                 }

                              </ListItemIcon>
                              <ListItemText
                                 primary={item.title} sx={{
                                    '& span': { fontSize: "14px!important" }
                                 }}
                              />
                              {(isFreeLesson && !course.enrolled) && <UnlockIcon sx={{ opacity: .5, fontSize: 17 }} />}
                           </ListItemButton>
                        })
                     }
                  </List>
               </AccordionDetails>
            }

         </Accordion>
         {divider !== false && <Divider />}
      </>
   )
}


const Sidebar = (props: SinglePageCompProps) => {
   const { course, topic } = props
   const router = useRouter()

   return (
      <Stack>
         {
            topic && <Stack mb={2}>
               <Stack direction="row" alignItems="center" mb={1} spacing={1}>
                  <IconButton
                     size="small"
                     onClick={() => router.push(`/course/${course.slug}`)}
                  >
                     <BackIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                  <Typography variant="h3" mb={1} fontSize={20}>{course.title}</Typography>
               </Stack>
               <CourseProgress value={course.enrolled?.progress} />
            </Stack>
         }

         <Stack
            bgcolor="background.paper"
            spacing={1}
            borderRadius={2}
            border={1}
            borderColor="divider"
         >
            <Typography variant="h6" pt={2} px={2}>Course content</Typography>
            <Stack>
               {
                  course.course_outline.map((lesson: any, idx) => {

                     return <LessonItem
                        {...props}
                        key={lesson.id}
                        lesson={lesson}
                        divider={course.course_outline[idx + 1] ? true : false}
                     />
                  })
               }
            </Stack>
         </Stack>
      </Stack>
   )
}

export default Sidebar