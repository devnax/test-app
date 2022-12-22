import React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import NoSSR from '@mui/material/NoSsr'
import ReactPlayer from 'react-player'
import IconButton from '@mui/material/IconButton'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import CalendarIcon from '@mui/icons-material/CalendarMonthRounded';
import { SingleCourseType } from './types'
import System from '@src/System'
import PaymentBox from '@src/components/PaymentBox'
import Modal from '@libs/Modal'
import Auth from '@src/System/Auth'
import { useRouter } from 'next/router'
import LoadingButton from '@mui/lab/LoadingButton'
import CheckoutRouter from '@src/Routers/Checkout'
import Toast from '@src/libs/Toast'
import moment from 'moment'
import CourseProgress from '@src/Partials/Courses/CourseProgress'

interface HeroBanerProps {
   course: SingleCourseType
}

interface CardItemProps {
   label: string;
   value: string;
}



const CardItem = ({ label, value }: CardItemProps) => {
   return (
      <Stack
         textAlign="center"
         bgcolor="#ffffff11"
         borderRadius={2}
         p={2}
         width={150}
      >
         <Typography variant="h4" color="#fff">{value}</Typography>
         <Typography variant="body2" color="#fff">{label}</Typography>
      </Stack>
   )
}


const HeroBanner = (props: HeroBanerProps) => {
   const auth = Auth.getAuth()
   const router = useRouter()
   const trans_key = router.query?.trans_key
   const { course } = props
   const course_settings = course.course_settings
   const countryInfo = System.getUserCountry()
   const { price, expire_days } = course_settings
   const isFree = price.local === 0

   let btnLabel = (isFree ? "Enroll Now" : "Continue to order")
   if (course.enrolled) {
      if (course.enrolled.progress == 100) {
         btnLabel = "Completed"
      } else if (course.enrolled.progress !== undefined) {
         btnLabel = "Continue"
      }
   }

   return (
      <Stack
         bgcolor="secondary.main"
         py={8}
      >
         <Container maxWidth="lg">
            <Grid container spacing={0}>
               <Grid item xs={12} md={8} p={1}>
                  <Typography
                     variant="h1"
                     fontSize={30}
                     mb={1}
                     color="#fff"
                  >{course.title}</Typography>
                  <Typography
                     variant="body2"
                     fontWeight={500}
                     color="#fff"
                     sx={{ opacity: .7 }}
                  >{course.excerpt}</Typography>

                  <Stack mt={3} direction="row" alignItems="center" spacing={2}>
                     {/* <CardItem
                        label="Videos"
                        value="40+"
                     /> */}
                     <CardItem
                        label="Lectures"
                        value={course.count_lectureItems.lectures.toString()}
                     />
                     <CardItem
                        label="Topics"
                        value={course.count_lectureItems.topics.toString()}
                     />
                     <CardItem
                        label="Quizs"
                        value={course.count_lectureItems.quizes.toString()}
                     />
                  </Stack>
               </Grid>
               <Grid item xs={12} md={4} p={1}>
                  <Stack
                     borderRadius={2}
                     border={1}
                     borderColor="divider"
                     bgcolor="#fff"
                  >
                     <Stack justifyContent="center" alignItems="center">
                        <Stack
                           display="block"
                           borderRadius={2}
                           overflow="hidden"
                           width="100%"
                           sx={{
                              minHeight: 200,
                              '& video, & iframe': {
                                 borderRadius: 2,
                                 height: "100%",
                                 minHeight: 200
                              }
                           }}
                        >
                           <NoSSR>
                              {
                                 course_settings.intro_video ? <ReactPlayer
                                    url={course_settings.intro_video}
                                    controls
                                    width="100%"
                                    height="100%"
                                 /> : <picture>
                                    <img src={course.thumbnail} alt={course.title} />
                                 </picture>
                              }
                           </NoSSR>
                        </Stack>
                     </Stack>

                     <Stack mt={1} p={1} spacing={1} >
                        {
                           !course.enrolled && <Stack direction="row" alignItems="center" spacing={.5}>
                              <Typography variant="h4" color="primary">{price.local && `${isFree ? "" : countryInfo.symbol}${price.local}`}</Typography>
                              {
                                 !!price.regular_normal && <Typography component="del" variant="body2" fontSize={14}>
                                    {isFree ? "" : countryInfo.symbol}{price.regular_normal}
                                 </Typography>
                              }
                           </Stack>
                        }

                        <Stack direction="row" alignItems="center" spacing={1}>
                           {
                              course.enroll_count && <Stack direction="row" alignItems="center" spacing={1}>
                                 <PeopleAltRoundedIcon sx={{ fontSize: 15 }} />
                                 <Typography variant="body2" fontSize={14}>
                                    {course.enroll_count}
                                 </Typography>
                              </Stack>
                           }

                           {
                              expire_days && <Stack direction="row" alignItems="center" spacing={1}>
                                 <CalendarIcon sx={{ fontSize: 15 }} />
                                 <Typography variant="body2" fontSize={14} fontWeight={500}>
                                    Duration {expire_days} Days
                                 </Typography>
                              </Stack>
                           }

                        </Stack>
                        {
                           course.enrolled && <>
                              <Stack>
                                 <Typography variant="body2" fontSize={14} fontWeight={500}>
                                    Enroll Date: {moment(course.enrolled.enroll_date).format("MMM Do YY")}
                                 </Typography>
                                 <Typography variant="body2" fontSize={14} fontWeight={500}>
                                    Expire Date: {moment(course.enrolled.expire_on).format("MMM Do YY")}
                                 </Typography>
                              </Stack>
                              <CourseProgress value={course.enrolled?.progress} />
                           </>
                        }
                        <Stack direction="row" alignItems="center" spacing={2}>
                           <LoadingButton
                              loading={trans_key ? true : false}
                              fullWidth
                              variant="contained"
                              onClick={async () => {
                                 if (!auth) {
                                    router.push(`/auth?redirect=${router.asPath}`)
                                    return;
                                 } else {
                                    if (course.enrolled) {
                                       const firstLessonItems: any = course.course_outline[0]?.items
                                       firstLessonItems && router.push(`/course/${course.slug}/${firstLessonItems[0]?.slug}`)
                                    } else {
                                       if (isFree) {
                                          try {
                                             const res: any = await CheckoutRouter.create({
                                                course_id: course.id,
                                                product_title: course.title,
                                                amount: 0,
                                                currency: countryInfo.symbol === "BDT" ? "BDT" : "USD",
                                                method: "free" as any,
                                                returnUrl: location.origin + location.pathname
                                             }, { timeout: 50000 });
                                             if (res) {
                                                router.push(`${location.origin + location.pathname}?trans_key=${res.trans_key}`)
                                             }
                                          } catch (err: any) {
                                             Toast.show({
                                                title: "Error",
                                                content: err.message,
                                                type: "error"
                                             })
                                          }
                                       } else {
                                          Modal.open("payment_modal", <PaymentBox
                                             product={{
                                                id: course.id,
                                                title: course.title,
                                                image: course.thumbnail
                                             }}
                                             amount={price.normal}
                                          />, {
                                             blur: 5,
                                             closeButton: false
                                          })
                                       }
                                    }

                                 }
                              }}
                           >
                              {btnLabel}

                           </LoadingButton>

                           <IconButton >
                              <FavoriteRoundedIcon />
                           </IconButton>
                        </Stack>
                     </Stack>
                  </Stack>
               </Grid>
            </Grid>

         </Container>
      </Stack >
   )
}

export default HeroBanner