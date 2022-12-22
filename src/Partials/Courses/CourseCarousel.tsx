import { FC, useEffect, useState, useId } from 'react'
import Stack from '@mui/material/Stack'
import CourseCard, { CourseCardProps } from '@src/components/CourseCard'
import CourseCategory from './CourseCategory'
import { Button } from '@mui/material'
import { PostQuery } from '@src/Routers'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { useTheme } from '@mui/material/styles'
import NextArrowIcon from '@mui/icons-material/ArrowForwardIosRounded';
import PrevArrowIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import "swiper/css";
import "swiper/css/pagination";
import LoadCourse from './LoadCourse'
import CourseSkeleton from './CourseSkeleton'

interface CourseCarouselProps extends PostQuery {
   hideCategory?: boolean;
   category?: string;
}



const CourseCarousel: FC<CourseCarouselProps> = ({ hideCategory, category, ...query }) => {
   const id = useId().replace(/:/gi, '')
   const [courses, setCourses] = useState<CourseCardProps[]>([])
   const [tab, setTab] = useState<string>(category || "IELTS")
   const [loading, setLoading] = useState(false)
   const theme = useTheme()

   useEffect(() => {
      (async () => {
         setLoading(true)
         const _courses = await LoadCourse({ category: tab, ...query }) || []
         setLoading(false)
         setCourses(_courses)
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [tab])


   return (
      <Stack spacing={1} minHeight={400}>
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

         <div>
            <Swiper
               spaceBetween={16}
               slidesPerView={1}
               navigation={{
                  nextEl: `.next${id}`,
                  prevEl: `.prev${id}`
               }}
               pagination={{
                  el: `.pagination${id}`,
                  clickable: true,
                  renderBullet: function (_index, className) {
                     return '<span class="' + className + '" style="background: ' + theme.palette.primary.main + '"></span>';
                  },
               }}
               modules={[Navigation, Pagination]}
               style={{ padding: 6, paddingBottom: 3 }}
               breakpoints={{
                  640: {
                     width: 640,
                     slidesPerView: 1,
                  },
                  768: {
                     width: 768,
                     slidesPerView: 2,
                  },
                  1000: {
                     width: 1000,
                     slidesPerView: 3,
                  },
                  1200: {
                     width: 1200,
                     slidesPerView: 4,
                  },
               }}
            >
               {
                  loading && [1, 2, 3, 4, 5, 6, 7, 8].map((_i: any) => (
                     <SwiperSlide key={_i} >
                        <CourseSkeleton />
                     </SwiperSlide>
                  ))
               }
               {
                  !loading && courses.map((course: any, idx: number) => (
                     <SwiperSlide key={idx} style={{ paddingTop: 20, paddingBottom: 20 }}>
                        <CourseCard
                           {...course}
                           hoverShadow={false}
                        />
                     </SwiperSlide>
                  ))
               }
            </Swiper>

         </div>

         <Stack display={courses.length > 4 ? "flex" : "none"} direction="row" justifyContent="space-between" px={.6} alignItems="center">
            <div className={`pagination${id}`} style={{ display: "inline-block" }}></div>
            <Stack direction="row" spacing={1}>
               <Button className={`prev${id}`} size="small"
                  sx={{
                     bgcolor: "primary.main",
                     color: "#fff",
                     '&:hover': {
                        bgcolor: "primary.light"
                     }
                  }}
               >
                  <PrevArrowIcon />
               </Button>
               <Button className={`next${id}`} size="small"
                  sx={{
                     bgcolor: "primary.main",
                     color: "#fff",
                     '&:hover': {
                        bgcolor: "primary.light"
                     }
                  }}
               >
                  <NextArrowIcon />
               </Button>
            </Stack>
         </Stack>

      </Stack>
   )
}

export default CourseCarousel
