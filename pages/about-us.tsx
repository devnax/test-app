import type { NextPage } from 'next'
import Layout from '@src/Partials/Layout'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ContentCount from '@src/Partials/ContentCount'
import PartnerCarousel from '@src/Partials/PartnersCarousel'
import Overview from '@contents/About/Overview'
import CorporateMission from '@contents/About/CorporateMission'
import CoreProduct from '@contents/About/CoreProduct'
import TestCenter from '@contents/About/TestCenter'
import StudyAbroad from '@contents/About/StudyAbroad'
import Portfolio from '@contents/About/Portfolio'
import Achivment from '@src/Partials/Achivment'
import SocialImpact from '@contents/About/SocialImpact'
import WomanEmpowerment from '@contents/About/WomanEmpowerment'

const AboutUs: NextPage = () => {
  return (
    <Layout title="About Us">
      <Stack py={4} bgcolor="primary.main" >
        <Container>
          <Typography variant="h2" textAlign="center" color="#fff">About Us</Typography>
        </Container>
      </Stack>

      <Overview />
      <CorporateMission />
      <CoreProduct />
      <TestCenter />
      <StudyAbroad />
      <Portfolio />
      <Achivment />
      <ContentCount />
      <SocialImpact />
      <WomanEmpowerment />

      <PartnerCarousel />
    </Layout>
  )
}

export default AboutUs
