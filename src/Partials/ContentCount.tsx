import React from 'react'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Image from 'next/image'


interface CounterItemProps {
   label: string;
   value: string;
   src: string;
}
interface DirectionItemProps {
   label: string;
   image: string;
}

const CounterItem = ({ label, value, src }: CounterItemProps) => {
   return (
      <Grid
         item
         xs={12}
         sm={6}
         md={3}

      >
         <Stack
            justifyContent="center"
            alignItems="center"
            borderRadius={2}
            p={3}
            height={200}
            spacing={2}
            bgcolor="#30303a"
         >
            <picture>
               <img width={50} src={src} alt={label} />
            </picture>
            <Stack textAlign="center">
               <Typography
                  variant="h3"
                  color="#fff"
               >{label}</Typography>
               <Typography
                  variant="body1"
                  fontWeight={400}
                  color="#fff"
                  sx={{ opacity: .7 }}
               >{value}</Typography>
            </Stack>
         </Stack>
      </Grid>
   )
}

const DirectionItem = ({ label, image }: DirectionItemProps) => {
   return (
      <Grid item xs={12} sm={6} md={3} p={2.5} >
         <Stack justifyContent="center" alignItems="center">
            <Image src={image} alt={label} width={150} height={150} />
            <Typography variant="h5" fontWeight={400} mt={2} textAlign="center">{label}</Typography>
         </Stack>
      </Grid>
   )
}

const ContentCount = () => {
   return (
      <Stack py={10} bgcolor="background.paper">
         <Container maxWidth="lg">
            <Stack
               p={4}
               borderRadius={2}
               mb={6}
            >
               <Stack mb={3}>
                  <Typography
                     variant="h2"
                     textAlign="center"
                     fontWeight={200}
                     fontSize={{ xs: 30, md: 40, lg: 50 }}
                     mb={2}
                  >
                     Our E-Learning
                  </Typography>
                  <Typography
                     variant="body2"
                     textAlign="center"
                     fontSize={18}
                  >
                     Our E-Learning platform gives students access to quality video lessons, quizzes to test understanding, practice tests for assessment, lecture notes and course materials. Students can also submit their assignments through the platform to be graded by our team of experienced teachers. The platform also has an in-built system to provide automatic progress reports so students can assess their progress during the course. Since all the courses are online, students can complete the course at their own pace without worrying about missed lectures or deadlines.
                  </Typography>
               </Stack>
               <Grid container
                  borderRadius={5}
                  p={3}
                  spacing={3}
               >
                  <CounterItem
                     label="3000+"
                     value="Minutes of video lessons"
                     src="/images/video.png"
                  />
                  <CounterItem
                     label="3500+"
                     value="Quizes"
                     src="/images/quiz.png"
                  />
                  <CounterItem
                     label="1000+"
                     value="Assignments"
                     src="/images/assignment.png"
                  />
                  <CounterItem
                     label="2000+"
                     value="Lecture notes"
                     src="/images/note.png"
                  />
               </Grid>
            </Stack>


            <Stack mb={2}>
               <Typography
                  variant="h2"
                  fontWeight={600}
                  fontSize={{ xs: 30, md: 40, lg: 30 }}
                  mb={1}
                  textAlign="center"
               >
                  How to start?
               </Typography>

            </Stack>
            <Stack
               border={1}
               borderColor="divider"
               borderRadius={2}
            >

               <Grid container py={4}>
                  <DirectionItem label="Create an Account" image="/images/directions/1.webp" />
                  <DirectionItem label="Choose Your Course" image="/images/directions/2.webp" />
                  <DirectionItem label="Get Enrolled" image="/images/directions/3.webp" />
                  <DirectionItem label="Start Your Course" image="/images/directions/4.webp" />
                  <DirectionItem label="Video Lectures" image="/images/directions/5.webp" />
                  <DirectionItem label="Solve Quizzes & Assignments" image="/images/directions/6.webp" />
                  <DirectionItem label="Take The Mocks" image="/images/directions/7.webp" />
                  <DirectionItem label="Get Your Desired Score" image="/images/directions/8.webp" />
               </Grid>
            </Stack>
         </Container>
      </Stack>
   )
}

export default ContentCount