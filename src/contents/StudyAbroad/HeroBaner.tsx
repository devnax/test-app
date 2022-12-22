import * as React from 'react';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper';
import "swiper/css/effect-fade";
import PageIcon from '@mui/icons-material/Description';
import ArrowRightIcon from '@mui/icons-material/ArrowRightAltRounded';
import { useTheme } from '@mui/material/styles'

interface SlideItemProps {
   image: string;
   title: string | React.ReactElement;
   desc?: string;
}

const SlideItem = ({ image, title, desc }: SlideItemProps) => {
   return <Grid container alignItems="center" bgcolor="background.paper" height={600}>
      <Grid
         item
         xs={12}
         md={6}
         order={{ xs: 1, sm: 0 }}
         sx={{ textAlign: { xs: "center", md: 'left' } }}
      >
         <Typography variant="h2"
            sx={{
               my: { xs: 3, md: 2 },
               fontWeight: '800',
               fontSize: { xs: 50, md: 70 },
               lineHeight: { xs: "50px", md: '70px' }
            }}
         >
            {title}
         </Typography>
         {
            desc && <Typography variant="h2" sx={{ my: 3, fontWeight: 400, lineHeight: '25px', fontSize: 18, color: 'text.secondary' }}>
               {desc}
            </Typography>
         }
         <Box>
            <Button
               startIcon={<PageIcon />}
               href="https://apply.mypiebd.com"
               target="_blank"
               variant="contained"
               color="success"
               sx={{ mr: 2, px: 3, py: 1.5, }}
               size="large">
               Apply Now
            </Button>
            <Button
               endIcon={<ArrowRightIcon />}
               variant="outlined"
               color="info"
               sx={{ mr: 2, px: 3, py: 1.5, }}
               size="large"
               href="/free-consultation"
            >
               Free consultation
            </Button>
         </Box>
      </Grid>
      <Grid item xs={12} md={6} p={{ xs: 0, md: 1 }}>
         <picture>
            <img src={image} alt="" style={{ width: '100%' }} />
         </picture>
      </Grid>
   </Grid>
}


const HeroBaner = () => {
   const theme = useTheme()

   return (
      <Stack
         bgcolor="background.paper"
         py={3}
      >
         <Container>
            <div >
               <Swiper
                  spaceBetween={30}
                  slidesPerView={1}
                  effect="fade"
                  autoplay={{
                     delay: 4000,
                     disableOnInteraction: false,
                     pauseOnMouseEnter: true
                  }}
                  modules={[Autoplay, EffectFade, Pagination]}
                  style={{ padding: 6, paddingBottom: 3 }}
                  pagination={{
                     el: `.study_abroad_pagination`,
                     clickable: true,
                     renderBullet: function (_index, className) {
                        return '<span class="' + className + '" style="background: ' + theme.palette.success.main + ';cursor: pointer"></span>';
                     },
                  }}
               >
                  <SwiperSlide>
                     <SlideItem
                        image='/images/study-abroad.png'
                        title={<><Box sx={{ display: 'inline-block', color: 'error.main' }}>Study</Box> Abroad</>}
                        desc="Since the very inception, PIE International Education has always been keen about the future of our dear students. We have successfully sent over 5K+ candidates abroad so far which are currently residing in Canada, USA, Malaysia, Australia and in the UK. We offer expert consultancy to our students, support them in researching their top university and program choices, apply for them, celebrate the reception of their offer letters, and provide all necessary assistance required for the VISA procedure."
                     />
                  </SwiperSlide>
                  <SwiperSlide>
                     <SlideItem
                        image='/images/canada-baner.png'
                        title={<>Study In <Box sx={{ display: 'inline-block', color: 'error.main' }}>Canada</Box></>}
                        desc="Academic excellence, affordability and adventure – Canada stands out as an ideal place to study. It hosts more than 250,000 international students and has experienced a huge increase in demand from overseas students in recent years."
                     />
                  </SwiperSlide>
                  <SwiperSlide>
                     <SlideItem
                        image='/images/usa-map.jpg'
                        title={<>Study In <Box sx={{ display: 'inline-block', color: 'error.main' }}>USA</Box></>}
                        desc="The US is home to the highest number of international students in the world. With famous cities, epic landscapes, high-ranked universities and vibrant exciting campus life, studying in the US offers the perfect blend of educational quality and cultural experience."
                     />
                  </SwiperSlide>
                  <SwiperSlide>
                     <SlideItem
                        image='/images/uk-baner.png'
                        title={<>Study In <Box sx={{ display: 'inline-block', color: 'error.main' }}>UK</Box></>}
                        desc="Home to some of the world’s greatest cities, the United Kingdom offers world-class education with a diverse and flexible range of courses. Besides, it is one of the most popular cultural hubs of Europe with a rich history to be proud of."
                     />
                  </SwiperSlide>
                  <SwiperSlide>
                     <SlideItem
                        image='/images/malaysia-baner.png'
                        title={<>Study In <Box sx={{ display: 'inline-block', color: 'error.main' }}>Malaysia</Box></>}
                        desc="Join one of our partner universities in Malaysia to study a diverse range of undergraduate courses, from business and engineering to arts and design."
                     />
                  </SwiperSlide>
                  <SwiperSlide>
                     <SlideItem
                        image='/images/australia-baner.png'
                        title={<>Study In <Box sx={{ display: 'inline-block', color: 'error.main' }}>Australia</Box></>}
                        desc="Whether you choose to undertake an MBA, engineering degree, humanities or English language course, Australia is difficult to beat in terms of standard of living, academic excellence, and support for international students."
                     />
                  </SwiperSlide>
               </Swiper>
               <Stack
                  className="study_abroad_pagination"
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  spacing={1}
               ></Stack>
            </div>
         </Container>
      </Stack>
   );
}


export default HeroBaner