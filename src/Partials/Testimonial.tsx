import React, { useId } from 'react';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
// import Button from '@mui/material/Button';
// import Link from 'next/link'
import Avatar from '@mui/material/Avatar'
import StarIcon from '@mui/icons-material/Star';
import Container from '@mui/material/Container'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper';
import { useTheme } from '@mui/material/styles'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const testimonials = [
   {
      image: '/images/testimonial/Rabika-Hassan.webp',
      content: "whether you are a quiet person or a boisterous one you will find very easy to talk to your instructor about your problems or regarding anything related to your education.A learner wants a right path and a perfect guidance for a successful future and I must say this is the place where you will get what you want to achieve with the great help and guidance of the teachers.I'm glad that I chose Pie as my learning institute, and I'm sure you will also be",
      name: 'Rabika Hassan',
      location: "Dhaka, Bangladesh"
   },
   {
      image: '/images/testimonial/Dip-Gomes.webp',
      content: "PIE helped me to start my further education quite perfectly and like most other institutions, PIE, will not only provide you guys bookish or set amount of knowledge .. They will also make sure that you become familiar with real life events and experiences .. and the faculty members are really great and friendly and you can knock them almost every time you are facing any educational or course related difficulties.",
      name: 'Dip Gomes',
      location: "Dhaka, Bangladesh"
   },
   {
      image: '/images/testimonial/Sultana-Begum.webp',
      content: 'I really liked about PIE is the teachers and the staffs were very cooperative with the students. currently, I am studying at a local university named UIU,with a good score of GED I would really suggest people who are willing to do GED and IELTS should go for PIE, it is a really good institution providing good education to students.',
      name: 'Sultana Begum',
      location: "Dhaka, Bangladesh"
   },
   {
      image: '/images/testimonial/Showvik-Das.webp',
      content: "I have given my SAT and TOEFL here. I have done well and later I applied for universities in USA. I got a scholarship and I am really happy that I tooky my chance here. Thank you.",
      name: 'Showvik Das',
      location: "Dhaka, Bangladesh"
   },
   {
      image: '/images/testimonial/Rifat-Nabil.jpg',
      content: "Hands down one of the best institution in Dhaka for taking your SAT/GED/IELTS and other classes. Each and every instructor are very professional and caring towards their students. Interactive classes and lessons are carefully organized, from mock test to reviewing.Moreover the staff is very friendly and willing to help.",
      name: 'Rifat Nabil',
      location: "Dhaka, Bangladesh"
   },
   {
      image: '/images/testimonial/Abrar-Ahmed-Zain.webp',
      content: `Just like teens of these days, I have been suffering a lot concerning my studies. I almost thought that I’m doomed and can’t make it to any university. Deep inside I was dying as the burden of my family’s expectation was leading me to a dark room.
However, thanks to almighty and my mentor for showing me the right track and guiding me all the way throughout my journey of GED.
Yes “GED” that worked as my passport to get into my university.
All thanks to PIE`,
      name: 'Abrar Ahmed Zain',
      location: "Dhaka, Bangladesh"
   },
   {
      image: '/images/testimonial/Rizwaan-Ahmed.webp',
      content: `I really liked about PIE is the teachers and the staffs were very cooperative with the students. currently, I am studying at a local university named UIU,with a good score of GED I would really suggest people who are willing to do GED and IELTS should go for PIE, it is a really good institution providing good education to students.`,
      name: 'Rizwaan Ahmed',
      location: "Dhaka, Bangladesh"
   },
   {
      image: '/images/testimonial/Sadia-Afrin.webp',
      content: `As an IELTS examinee I would love to recommend PIE to anyone sitting for IELTS exam because the mentors here provide us with complete and accurate guidelines that prepare us for our exam on time. I had only given three mocks and without any classes I have been awarded band 7.0 which was unexpected and exceeded my requirement.`,
      name: 'Sadia Afrin',
      location: "Dhaka, Bangladesh"
   }
]

const TestimonialCard = ({ item }: any) => {
   const { name, image, location, content } = item
   return (
      <Stack py={2} borderRadius={2} border={1} borderColor="divider" height={350}>
         <Stack direction="row" px={2} alignItems="center" spacing={2}>
            <Avatar sx={{ width: 50, height: 50 }} alt={name} src={image} />
            <Stack>
               <Typography variant="h6" sx={{ fontWeight: '600' }}>
                  {name}
               </Typography>
               <Typography variant="body1" sx={{ fontSize: 14 }}>
                  {location}
               </Typography>
               <Stack direction="row" alignItems="center">
                  <StarIcon sx={{ color: 'orange', fontSize: 16 }} />
                  <StarIcon sx={{ color: 'orange', fontSize: 16 }} />
                  <StarIcon sx={{ color: 'orange', fontSize: 16 }} />
                  <StarIcon sx={{ color: 'orange', fontSize: 16 }} />
                  <StarIcon sx={{ color: 'orange', fontSize: 16 }} />
               </Stack>
            </Stack>
         </Stack>
         <Box sx={{
            px: 2,
            position: 'relative',
            overflow: 'initial',
         }}>
            <Typography variant="body1" sx={{
               my: 2,
               fontSize: 16,
               color: 'text.primary',
               lineHeight: '24px',

            }}>
               {content}
            </Typography>
         </Box>
      </Stack>
   )
}


const Testimonials = () => {
   const id = useId().replace(/:/gi, '')
   const theme = useTheme()
   return (
      <Swiper
         autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
         }}
         spaceBetween={30}
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
         modules={[Navigation, Pagination, Autoplay]}
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
               slidesPerView: 2,
            },
            1200: {
               width: 1200,
               slidesPerView: 3,
            },
         }}

      >
         {
            testimonials.map((item, idx) => <SwiperSlide
               key={idx}
               style={{
                  borderRadius: 16,
               }}
            >
               <TestimonialCard item={item} />
            </SwiperSlide>)
         }
      </Swiper>
   )
}


const TestimonialCarousel = () => {

   return (
      <Stack
         bgcolor="background.paper"
         py={15}
      >
         <Container maxWidth="sm">
            <Box sx={{ textAlign: 'center' }}>
               <Typography variant="h2" sx={{ mb: 6, textAlign: 'center', fontWeight: 500, fontSize: 35 }}>
                  What Our Students Say About Us
               </Typography>

            </Box>
         </Container>
         <Container maxWidth="lg">
            <Testimonials />
         </Container>
      </Stack>

   );
}


export default TestimonialCarousel