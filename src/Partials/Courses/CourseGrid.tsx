import { FC, useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import CourseCard, { CourseCardProps } from '@src/components/CourseCard'
import CourseCategory from './CourseCategory'
import { PostQuery } from '@src/Routers'
import LoadCourse from './LoadCourse'
import CourseSkeleton from './CourseSkeleton'
import Button from '@mui/material/Button'

interface CourseGridProps extends PostQuery {
   hideCategory?: boolean;
   category?: string;
   showExpire?: boolean;
   search?: string;
   loadMore?: boolean;
}


const CourseGrid: FC<CourseGridProps> = ({ hideCategory, category, showExpire, search, loadMore, ...query }) => {
   const [courses, setCourses] = useState<CourseCardProps[]>([])
   const [finish, setFinish] = useState<any>(false)
   const [tab, setTab] = useState<any>(category)
   const [page, setPage] = useState<any>(1)
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      setPage(1)
   }, [category, search])

   useEffect(() => {
      (async () => {
         const q: any = { ...query }
         q.category = tab
         q.page = page
         if (search) {
            q.q = search
         }
         let _courses = await LoadCourse(q) || []
         if (!_courses.length || _courses.length < 30) {
            setFinish(true)
         }
         setLoading(false)
         if (page > 1) {
            _courses = [
               ...courses,
               ..._courses
            ]
         }
         setCourses(_courses)
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [tab, category, search, page])



   return (
      <Stack spacing={2} minHeight={600}>
         {!hideCategory && <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
         >
            <CourseCategory
               active={tab}
               onChange={(t) => setTab(t)}
            />
         </Stack>}
         <Grid container>
            {
               loading && [1, 2, 3, 4, 5, 6, 7, 8].map((_i: any) => (
                  <Grid key={_i} item md={3} sx={{ p: 1 }}>
                     <CourseSkeleton
                     />
                  </Grid>
               ))
            }
            {
               !loading && courses.map((course: any, idx: number) => (
                  <Grid key={idx} item md={3} sx={{ p: 1 }}>
                     <CourseCard
                        {...course}
                        showExpire={showExpire}
                     />
                  </Grid>
               ))
            }
         </Grid>
         {
            (loadMore && !finish) && <Stack alignItems="center" my={3}>
               <Button
                  variant="contained"
                  onClick={() => {
                     setPage(page + 1)
                  }}
               >
                  Load More
               </Button>
            </Stack>
         }

      </Stack>
   )
}

const CourseList: FC<CourseGridProps> = (props) => {
   const cat = props.category
   return <CourseGrid {...props} key={cat} category={cat} />
}

export default CourseList