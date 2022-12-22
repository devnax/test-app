import React, { useEffect, useState } from 'react'
import HeroBanner from "@contents/Courses/Single/HeroBanner"
import Layout from '@src/Partials/Layout'
import CourseContent from '@contents/Courses/Single/CourseContent'
import { useRouter } from 'next/router'
import { SingleCourseType } from '@contents/Courses/Single/types'
import { withStore } from 'state-range'
import CourseAction from '@contents/Courses/actions/Course'
import ErrorPage from '@contents/404'
import CourseSinglePage from '@src/Skeletons/CourseSinglePage'

const SingleCourse = () => {
   const router = useRouter()
   const [course, setCourse] = useState<SingleCourseType>()
   const [error, setError] = useState(false)

   useEffect(() => {
      if (router.query.slug) {
         if (!course) {
            (async () => {
               const _course = await CourseAction.getSingleCourse(router.query.slug as any)
               if (_course) {
                  setCourse({ ...(course || {}), ..._course })
                  setError(false)
               } else {
                  setError(true)
               }
            })();
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [router.query.slug])

   return (
      <Layout title={course ? course.title : router.query.slug as any}>
         <>
            {
               (!error && !course) && <CourseSinglePage />
            }
            {
               error && <ErrorPage />
            }
            {
               course && <>
                  <HeroBanner course={course} />
                  <CourseContent course={course} update={(d: Partial<SingleCourseType>) => setCourse({ ...course, ...d })} />
               </>
            }
         </>
      </Layout>
   )
}


export default withStore(SingleCourse) 