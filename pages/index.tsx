import type { NextPage } from 'next'
import Layout from '@src/Partials/Layout'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import HeroBaner from '@contents/Home/HeroBaner'
import PrepareMockSection from '@contents/Home/PrepareMockSection'
import AmericanDiploma from '@contents/Home/AmericanDiploma'
import AdminssionSection from '@contents/Home/AdminssionSection'
import StudyAbroad from '@contents/Home/StudyAbroad'
import CourseCarousel from '@src/Partials/Courses/CourseCarousel'
import ContentCount from '@src/Partials/ContentCount'
import Achivment from '@src/Partials/Achivment'
import Testimonial from '@src/Partials/Testimonial'
import Partners from '@src/Partials/PartnersCarousel'
import Typography from '@mui/material/Typography'

const Home: NextPage = () => {
  return (
    <Layout title="PIE Academy">
      <HeroBaner />
      <Stack bgcolor="background.default">
        <Container maxWidth="lg" sx={{ py: 6, }}>
          <Typography variant="h2" color="text.primary" fontSize={35} fontWeight={600} mb={3}>Test Prep Courses</Typography>
          <CourseCarousel />
        </Container>
      </Stack>
      <AmericanDiploma />
      <PrepareMockSection />
      <AdminssionSection />
      <StudyAbroad />
      <ContentCount />
      <Achivment />
      <Testimonial />
      <Partners />
    </Layout>
  )
}

export default Home
