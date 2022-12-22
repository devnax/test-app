import type { NextPage } from 'next'
import Layout from '@src/Partials/Layout'
import HeroBaner from '@contents/StudyAbroad/HeroBaner'
import Partners from '@src/Partials/PartnersCarousel'
import ScholarshipSection from '@contents/StudyAbroad/SchoolarshipSection'
import AvailabelCoursesSection from '@contents/StudyAbroad/AvailabelCoursesSection'
import ServiceSection from '@contents/StudyAbroad/ServiceSection'
import HowWeWorkSection from '@contents/StudyAbroad/HowWeWorkSection'



const StudyAbroad: NextPage = () => {
  return (
    <Layout title="PIE Academy">
      <HeroBaner />
      <ScholarshipSection />
      <AvailabelCoursesSection />
      <ServiceSection />
      <HowWeWorkSection />
      <Partners />
    </Layout>
  )
}

export default StudyAbroad
