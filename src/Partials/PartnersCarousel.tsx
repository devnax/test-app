import React, { useId } from 'react';
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper';
import { useTheme } from '@mui/material/styles'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Button from '@mui/material/Button'
import { useRouter } from 'next/router';
import ArrowRightIcon from '@mui/icons-material/ArrowRightAltRounded';

const PartnerItem = ({ src }: { src: string }) => {
   return (
      <Stack
         p={1}
         bgcolor="background.paper"
         borderRadius={2}
         height={100}
         alignItems="center"
         justifyContent="center"
      >
         <picture>
            <img width="100%" src={src} alt="" />
         </picture>
      </Stack>
   )
}


const PartnersCarousel = () => {
   const id = useId().replace(/:/gi, '')
   const theme = useTheme()
   return (
      <Swiper
         speed={2000}
         autoplay={{
            delay: 0,
            disableOnInteraction: false
         }}
         spaceBetween={20}
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
               slidesPerView: 2,
            },
            768: {
               width: 768,
               slidesPerView: 3,
            },
            1000: {
               width: 1000,
               slidesPerView: 5,
            },
            1200: {
               width: 1200,
               slidesPerView: 6,
            },
         }}
      >

         <SwiperSlide>
            <PartnerItem src="/images/partners/testprep/1.jpg" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/testprep/2.jpg" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/testprep/3.jpg" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/testprep/4.jpg" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/testprep/5.jpg" />
         </SwiperSlide>


         <SwiperSlide>
            <PartnerItem src="/images/partners/usa/16.png" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/usa/22.png" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/usa/21.png" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/usa/13.png" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/usa/54.png" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/usa/1.png" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/usa/5.png" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/usa/15.png" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/usa/8.png" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/usa/7.png" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/usa/25.png" />
         </SwiperSlide>

         <SwiperSlide>
            <PartnerItem src="/images/partners/malaysia/2.png" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/malaysia/3.png" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/malaysia/4.png" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/malaysia/5.png" />
         </SwiperSlide>

         <SwiperSlide>
            <PartnerItem src="/images/partners/australia/26.png" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/australia/25.png" />
         </SwiperSlide>

         <SwiperSlide>
            <PartnerItem src="/images/partners/uk/26.png" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/uk/24.png" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/uk/5.png" />
         </SwiperSlide>

         <SwiperSlide>
            <PartnerItem src="/images/partners/canada/11.png" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/canada/13.png" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/canada/16.png" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/canada/17.png" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/canada/28.png" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/canada/27.png" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/canada/25.png" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/canada/24.png" />
         </SwiperSlide>
         <SwiperSlide>
            <PartnerItem src="/images/partners/canada/19.png" />
         </SwiperSlide>

      </Swiper>
   )
}


const Partners = () => {
   const router = useRouter()
   return (
      <Stack
         bgcolor="background.paper"
         py={5}
         overflow="hidden"
      >
         <Typography variant="h2" mb={1} fontSize={30} textAlign="center">
            Our Partners
         </Typography>
         <Stack mb={4} alignItems="center" >
            <Button endIcon={<ArrowRightIcon />} size="large" onClick={() => router.push('/partners')}>
               SEE ALL
            </Button>
         </Stack>
         <PartnersCarousel />

      </Stack>

   );
}


export default Partners