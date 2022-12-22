import * as React from 'react';
import Grid from '@mui/material/Grid'
import { alpha } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button';
import Link from 'next/link'
import Container from '@mui/material/Container';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper';
import "swiper/css/effect-fade";
import ArrowIcon from '@mui/icons-material/ArrowRightAltRounded';

interface SlideItemProps {
   image: string;
   title: string | React.ReactElement;
   desc?: string;
   color?: string;
   link?: string;
   buttonText?: string;
   secondaryButtonText?: string;
   secondaryLink?: string;
}

const SlideItem = ({ image, title, desc, color, link, buttonText, secondaryButtonText, secondaryLink }: SlideItemProps) => {
   return <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      bgcolor="background.paper"
      height={{
         xs: 1000,
         sm: 800,
         md: 600
      }}
   >
      <Grid
         item
         xs={12}
         md={6}
         order={{ xs: 1, sm: 0 }}
         sx={{ textAlign: { xs: "center", md: 'left' } }}
         p={1}
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
            desc && <Typography
               variant="body2"
               mb={3}
               lineHeight="25px"
               fontSize={17}
               sx={{ opacity: .9 }}
            >
               {desc}
            </Typography>
         }
         <Box>
            <Link href={link || "/courses"}>
               <Button
                  href={link || "/courses"}
                  variant="contained"
                  sx={{
                     mr: 2,
                     px: 3,
                     py: 1.5,
                     bgcolor: color || "primary.main",
                     color: "#fff",
                     '&:hover': {
                        bgcolor: (color && alpha(color, .7)) || "primary.dark"
                     }
                  }}
                  size="large"
               >
                  {
                     buttonText || "Browse Course"
                  }

               </Button>
            </Link>
            <Link href={secondaryLink || "/bookfreeclass"}>
               <Button
                  href={secondaryLink || "/bookfreeclass"}
                  color="secondary"
                  sx={{
                     px: 3,
                     py: 1.5,
                     bgcolor: t => alpha(t.palette.secondary.main, .1)
                  }}
                  size="large"
                  endIcon={<ArrowIcon />}
               >
                  {secondaryButtonText || "Book a free class"}
               </Button>
            </Link>
         </Box>
      </Grid>
      <Grid item xs={12} md={6} p={{ xs: 0, md: 3 }}>
         <picture>
            <img src={image} alt="" style={{ width: '100%' }} />
         </picture>
      </Grid>
   </Grid>
}


const HeroBaner = () => {

   return (
      <Stack
         bgcolor="background.paper"
      >
         <Container>
            <div>
               <Swiper
                  spaceBetween={30}
                  slidesPerView={1}
                  effect="fade"
                  autoplay={{
                     delay: 4000,
                     disableOnInteraction: false,
                     pauseOnMouseEnter: true
                  }}
                  modules={[Autoplay, EffectFade]}
                  style={{ padding: 6, paddingBottom: 3 }}
               >

                  <SwiperSlide>
                     <SlideItem
                        link="/about-us"
                        buttonText='About Us'
                        image='/images/pie-academy.png'
                        title={<><Box sx={{ display: 'inline-block', color: 'primary.main' }}>PIE</Box> Academy</>}
                        desc="PIE International Education is a test prep and education consultant. PIE was incepted in 2005, and since then it has grown into a household name in study abroad, student placement and standardized test prep (IELTS, SAT, GED, GRE, etc.). PIE provides a one-stop solution for Test Prep students, beginning from test prep and testing facilities to study abroad counseling and placement. PIE Academy is the very first of its kind to introduce e-learning platform in the country providing ease & convenience to the students for self learning."
                     />
                  </SwiperSlide>
                  <SwiperSlide>
                     <SlideItem
                        buttonText='Book a test'
                        color="#25BA3A"
                        link="/courses/mock-test"
                        image='/images/mock-home.png'
                        title={<><Box sx={{ display: 'inline-block', color: '#25BA3A' }}>Mock</Box> Test</>}
                        desc="PIE offer IELTS CBT, GED, SAT and GRE simulated user interface Mock Test. There is a time limit to complete each section of the practice test, like the actual test. When you start a test, you need to complete each test section within the time limit. You will receive 6 months of access for each practice test you purchase. These test gives you the confidence and experience of practising with official test questions for which you'll receive feedback from qualified markers.
                        You can attend your online mock tests at any hour from the comfort of your own home. You can expect instant results whereas your writing assessment will be provided within 48 hours of the test. "
                     />
                  </SwiperSlide>
                  <SwiperSlide>
                     <SlideItem
                        buttonText='Apply Now'
                        secondaryButtonText="Free Consultation"
                        secondaryLink="/free-consultation"
                        color="#407BFF"
                        link="/study-abroad"
                        image='/images/study-abroad-home.png'
                        title={<><Box sx={{ display: 'inline-block', color: '#407BFF' }}>Study</Box> Abroad</>}
                        desc="Since the very inception, PIE International Education has always been keen about the future of our dear students. We have successfully sent over 5K+ candidates abroad so far which are currently residing in Canada, USA, Malaysia, Australia and in the UK. We offer expert consultancy to our students, support them in researching their top university and program choices, apply for them, celebrate the reception of their offer letters, and provide all necessary assistance required for the VISA procedure."
                     />
                  </SwiperSlide>
                  <SwiperSlide>
                     <SlideItem
                        buttonText='Enroll Now'
                        color="#FFC100"
                        link="/courses/ged"
                        image='/images/ged-diploma.png'
                        title={<>American High School <Box sx={{ display: 'inline-block', color: '#FFC100' }}>(GED)</Box></>}
                        desc="The GED test, which consists of four subject tests, is an alternative to the US and Canadian high school diploma. Upon passing, the examinee will get certification that their academic skills are at high school level. The GED can be taken in 60 countries around the world. Since it was first administered in 1942, more than 20 million people received their high school Equivalency by passing the GED."
                     />
                  </SwiperSlide>

                  <SwiperSlide>
                     <SlideItem
                        buttonText='Enroll Now'
                        color="#FF2D2D"
                        link="/courses/admission-test"
                        image='/images/admission-test-home.png'
                        title={<>Admission Test <Box sx={{ display: 'inline-block', color: '#FF2D2D' }}> IBA - BBA/MBA</Box> </>}
                        desc="Our course has been designed and optimised to help you self-study for the IBA - BBA/MBA admission test. This course is also useful if you are going to sit for the admission tests of private universities (like NSU, BRAC, IUB, AIUB, EWU). Our course is divided into four parts – English, Mathematics, Writing and Analytical Ability. There are 3 full-length mocks at the end of the course for you to test yourself with real exam questions under time controls. Throughout the course, there are various tips and notes to help you perform better during the exam. "
                     />
                  </SwiperSlide>




                  <SwiperSlide>
                     {/* <SlideItem
                        image='/images/hero2.png'
                        title={<><Box sx={{ display: 'inline-block', color: 'primary.main' }}>E-Learning</Box></>}
                        desc="Traditional training can be rather slow because it depends on the trainers’ working hours. An LMS is available anytime, making it possible for you to study whenever you feel like: when commuting, during your lunch break, or at home. All the learning material is stored in one place, i.e., an LMS. Students can log in to the LMS at a convenient time from any device, find the course they need, and refresh their memory."
                     /> */}
                     <SlideItem
                        image='/images/hero2.png'
                        title={<><Box sx={{ display: 'inline-block', color: 'primary.main' }}>E-Learning</Box></>}
                        desc="Our E-Learning platform gives students access to quality video lessons, quizzes to test understanding, practice tests for assessment, lecture notes and course materials. Students can also submit their assignments through the platform to be graded by our team of experienced teachers. The platform also has an in-built system to provide automatic progress reports so students can assess their progress during the course. Since all the courses are online, students can complete the course at their own pace without worrying about missed lectures or deadlines."
                     />
                  </SwiperSlide>
                  <SwiperSlide>
                     <SlideItem
                        image='/images/hero1.png'
                        title={<><Box sx={{ display: 'inline-block', color: 'primary.main' }}>Video</Box> Lesson</>}
                        desc="Convenience is one of the main reasons people love eLearning Watching an educational video, or taking a quiz — all that is eLearning. Video lesson make education visually compelling. As soon as you start a lesson, you will be greeted by a video. Once you finish the video lesson, there will be a quiz and an assignment for each of the sessions. You will need to complete an exercise in order to move on to the next one."
                     />
                  </SwiperSlide>
                  <SwiperSlide>
                     <SlideItem
                        buttonText='Enroll Now'
                        color="#8E8EF9"
                        image='/images/on-campus-online.png'
                        title={<><Box sx={{ display: 'inline-block', color: '#8E8EF9' }}>On Campus</Box> & Online</>}
                        desc="Our live sessions are conducted through Google Meet, so you have the closest experience of an interactive real-life classroom. Lecture notes and content resources, organized and uploaded on google classroom so you do not need go to the trouble of sorting things out. Availability of practice materials for self improvement End of the course mock test opportunities inclusive of the program"
                     />
                  </SwiperSlide>


               </Swiper>
            </div>
         </Container>
      </Stack>
   );
}


export default HeroBaner