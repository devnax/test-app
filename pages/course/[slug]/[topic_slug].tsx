import React, { useEffect, useState } from 'react'
import Layout from '@src/Partials/Layout'
import CourseContent from '@contents/Courses/Single/CourseContent'
import { useRouter } from 'next/router'
import { SingleCourseType } from '@contents/Courses/Single/types'
import CourseAction from '@contents/Courses/actions/Course'
import { Post } from '@src/Routers'
import Stack from '@mui/material/Stack'
import CourseSinglePage from '@src/Skeletons/CourseSinglePage'

const SingleCourse = () => {
   const router = useRouter()
   const { slug, topic_slug } = router.query
   const [course, setCourse] = useState<SingleCourseType>()
   const [topic, setTopic] = useState<Post>()
   const [error, setError] = useState(false)

   useEffect(() => {
      if (slug && topic_slug) {
         (async () => {
            const _course = course || await CourseAction.getSingleCourse(slug as any)
            const outline = _course.course_outline || []
            let _currentLesson = null;
            let isValid = _course.enrolled

            for (let lesson of outline) {
               for (let item of lesson.items) {
                  if (item.slug === topic_slug) {
                     _currentLesson = lesson
                     break;
                  }
               }
               if (_currentLesson) {
                  isValid = _course.enrolled || _currentLesson.props.sample_lesson === 'yes'
                  break;
               }
            }

            const _topic = await CourseAction.getTopic(topic_slug as any, _course.id)
            if (_course && _topic && isValid) {
               setCourse(_course)
               setTopic(_topic)
               setError(false)
            } else {
               setError(true)
            }
         })();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [slug, topic_slug])


   return (
      <Layout title={topic ? topic.title : (course ? course.title : topic_slug as any)}>
         <Stack>
            {
               (!error && !course) && <CourseSinglePage topic={true} />
            }
            {
               course && <Stack bgcolor="background.paper">
                  <CourseContent
                     course={course}
                     update={(d: Partial<SingleCourseType>) => setCourse({ ...course, ...d })}
                     topic={topic as any}
                  />
               </Stack>
            }
         </Stack>
      </Layout>
   )
}


export default SingleCourse