import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import System from '@src/System'
import CourseGrid from '@src/Partials/Courses/CourseGrid'
import Typography from '@mui/material/Typography'

const Courses = () => {
   const [ids, setIds] = useState<number[]>([])

   useEffect(() => {
      (async () => {
         const user_courses = await System.getUserCoursesInfo()
         if (user_courses) {
            setIds(user_courses.map((enroll: any) => enroll.course_id))
         }
      })();
   }, [])


   return (
      <Stack spacing={2}>
         <Typography variant="body2" fontWeight={600}>Enrolled {ids.length} courses</Typography>
         {
            !!ids.length && <CourseGrid hideCategory showExpire id={{ in: ids } as any} />
         }
      </Stack>
   )
}

export default Courses