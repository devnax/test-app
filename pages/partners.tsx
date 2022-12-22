import type { NextPage } from 'next'
import Layout from '@src/Partials/Layout'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import PartnerSection from '@contents/Partners/PartnerSection'
import ApplyNowSection from '@contents/Partners/ApplyNowSection'



const Partners: NextPage = () => {
   return (
      <Layout title="Our Partners">
         <ApplyNowSection />
         <Container>
            <Stack spacing={3} py={3}>
               <PartnerSection
                  title="Our Test Prep Partners"
                  items={[
                     { src: "/images/partners/testprep/1.jpg" },
                     { src: "/images/partners/testprep/2.jpg" },
                     { src: "/images/partners/testprep/3.jpg" },
                     { src: "/images/partners/testprep/4.jpg" },
                     { src: "/images/partners/testprep/5.jpg" },
                  ]}
               />
               <PartnerSection
                  title="USA"
                  items={[
                     { src: "/images/partners/usa/1.png" },
                     { src: "/images/partners/usa/2.png" },
                     { src: "/images/partners/usa/3.png" },
                     { src: "/images/partners/usa/4.png" },
                     { src: "/images/partners/usa/5.png" },
                     { src: "/images/partners/usa/6.png" },
                     { src: "/images/partners/usa/7.png" },
                     { src: "/images/partners/usa/8.png" },
                     { src: "/images/partners/usa/9.png" },
                     { src: "/images/partners/usa/10.png" },
                     { src: "/images/partners/usa/11.png" },
                     { src: "/images/partners/usa/12.png" },
                     { src: "/images/partners/usa/13.png" },
                     { src: "/images/partners/usa/14.png" },
                     { src: "/images/partners/usa/15.png" },
                     { src: "/images/partners/usa/16.png" },
                     { src: "/images/partners/usa/17.png" },
                     { src: "/images/partners/usa/18.png" },
                     { src: "/images/partners/usa/19.png" },
                     { src: "/images/partners/usa/20.png" },
                     { src: "/images/partners/usa/21.png" },
                     { src: "/images/partners/usa/22.png" },
                     { src: "/images/partners/usa/23.png" },
                     { src: "/images/partners/usa/24.png" },
                     { src: "/images/partners/usa/25.png" },
                     { src: "/images/partners/usa/26.png" },
                     { src: "/images/partners/usa/27.png" },
                     { src: "/images/partners/usa/28.png" },
                     { src: "/images/partners/usa/29.png" },
                     { src: "/images/partners/usa/30.png" },
                     { src: "/images/partners/usa/31.png" },
                     { src: "/images/partners/usa/32.png" },
                     { src: "/images/partners/usa/33.png" },
                     { src: "/images/partners/usa/34.png" },
                     { src: "/images/partners/usa/35.png" },
                     { src: "/images/partners/usa/36.png" },
                     { src: "/images/partners/usa/37.png" },
                     { src: "/images/partners/usa/38.png" },
                     { src: "/images/partners/usa/39.png" },
                     { src: "/images/partners/usa/40.png" },
                     { src: "/images/partners/usa/41.png" },
                     { src: "/images/partners/usa/42.png" },
                     { src: "/images/partners/usa/43.png" },
                     { src: "/images/partners/usa/44.png" },
                     { src: "/images/partners/usa/45.png" },
                     { src: "/images/partners/usa/46.png" },
                     { src: "/images/partners/usa/47.png" },
                     { src: "/images/partners/usa/48.png" },
                     { src: "/images/partners/usa/49.png" },
                     { src: "/images/partners/usa/50.png" },
                     { src: "/images/partners/usa/51.png" },
                     { src: "/images/partners/usa/52.png" },
                     { src: "/images/partners/usa/53.png" },
                     { src: "/images/partners/usa/54.png" },
                     { src: "/images/partners/usa/55.png" },
                     { src: "/images/partners/usa/56.png" },
                     { src: "/images/partners/usa/57.png" },
                     { src: "/images/partners/usa/58.png" },
                  ]}
               />
               <PartnerSection
                  title="UK"
                  items={[
                     { src: "/images/partners/uk/1.png" },
                     { src: "/images/partners/uk/2.png" },
                     { src: "/images/partners/uk/3.png" },
                     { src: "/images/partners/uk/4.png" },
                     { src: "/images/partners/uk/5.png" },
                     { src: "/images/partners/uk/6.png" },
                     { src: "/images/partners/uk/7.png" },
                     { src: "/images/partners/uk/8.png" },
                     { src: "/images/partners/uk/9.png" },
                     { src: "/images/partners/uk/10.png" },
                     { src: "/images/partners/uk/11.png" },
                     { src: "/images/partners/uk/12.png" },
                     { src: "/images/partners/uk/13.png" },
                     { src: "/images/partners/uk/14.png" },
                     { src: "/images/partners/uk/15.png" },
                     { src: "/images/partners/uk/16.png" },
                     { src: "/images/partners/uk/17.png" },
                     { src: "/images/partners/uk/18.png" },
                     { src: "/images/partners/uk/19.png" },
                     { src: "/images/partners/uk/20.png" },
                     { src: "/images/partners/uk/21.png" },
                     { src: "/images/partners/uk/22.png" },
                     { src: "/images/partners/uk/23.png" },
                     { src: "/images/partners/uk/24.png" },
                     { src: "/images/partners/uk/25.png" },
                     { src: "/images/partners/uk/26.png" }
                  ]}
               />

               <PartnerSection
                  title="CANADA"
                  items={[
                     { src: "/images/partners/canada/1.png" },
                     { src: "/images/partners/canada/2.png" },
                     { src: "/images/partners/canada/3.png" },
                     { src: "/images/partners/canada/4.png" },
                     { src: "/images/partners/canada/5.png" },
                     { src: "/images/partners/canada/6.png" },
                     { src: "/images/partners/canada/7.png" },
                     { src: "/images/partners/canada/8.png" },
                     { src: "/images/partners/canada/9.png" },
                     { src: "/images/partners/canada/10.png" },
                     { src: "/images/partners/canada/11.png" },
                     { src: "/images/partners/canada/12.png" },
                     { src: "/images/partners/canada/13.png" },
                     { src: "/images/partners/canada/14.png" },
                     { src: "/images/partners/canada/15.png" },
                     { src: "/images/partners/canada/16.png" },
                     { src: "/images/partners/canada/17.png" },
                     { src: "/images/partners/canada/18.png" },
                     { src: "/images/partners/canada/19.png" },
                     { src: "/images/partners/canada/20.png" },
                     { src: "/images/partners/canada/21.png" },
                     { src: "/images/partners/canada/22.png" },
                     { src: "/images/partners/canada/23.png" },
                     { src: "/images/partners/canada/24.png" },
                     { src: "/images/partners/canada/25.png" },
                     { src: "/images/partners/canada/26.png" },
                     { src: "/images/partners/canada/27.png" },
                     { src: "/images/partners/canada/28.png" },
                     { src: "/images/partners/canada/29.png" },
                     { src: "/images/partners/canada/30.png" },
                     { src: "/images/partners/canada/31.png" },
                     { src: "/images/partners/canada/32.png" },
                     { src: "/images/partners/canada/33.png" },
                     { src: "/images/partners/canada/34.png" },
                     { src: "/images/partners/canada/35.png" },
                     { src: "/images/partners/canada/36.png" },
                     { src: "/images/partners/canada/37.png" },
                     { src: "/images/partners/canada/38.png" },
                     { src: "/images/partners/canada/39.png" },
                     { src: "/images/partners/canada/40.png" },
                     { src: "/images/partners/canada/41.png" },
                     { src: "/images/partners/canada/42.png" },
                     { src: "/images/partners/canada/43.png" },
                     { src: "/images/partners/canada/44.png" },
                     { src: "/images/partners/canada/45.png" },
                     { src: "/images/partners/canada/46.png" },
                     { src: "/images/partners/canada/47.png" },
                     { src: "/images/partners/canada/48.png" },
                     { src: "/images/partners/canada/49.png" },
                     { src: "/images/partners/canada/50.png" },
                     { src: "/images/partners/canada/51.png" },
                     { src: "/images/partners/canada/52.png" },
                     { src: "/images/partners/canada/53.png" },
                     { src: "/images/partners/canada/54.png" },
                     { src: "/images/partners/canada/55.png" }
                  ]}
               />

               <PartnerSection
                  title="Malaysia"
                  items={[
                     { src: "/images/partners/malaysia/1.png" },
                     { src: "/images/partners/malaysia/2.png" },
                     { src: "/images/partners/malaysia/3.png" },
                     { src: "/images/partners/malaysia/4.png" },
                     { src: "/images/partners/malaysia/5.png" },
                  ]}
               />
               <PartnerSection
                  title="Australia"
                  items={[
                     { src: "/images/partners/australia/1.png" },
                     { src: "/images/partners/australia/2.png" },
                     { src: "/images/partners/australia/3.png" },
                     { src: "/images/partners/australia/4.png" },
                     { src: "/images/partners/australia/5.png" },
                     { src: "/images/partners/australia/6.png" },
                     { src: "/images/partners/australia/7.png" },
                     { src: "/images/partners/australia/8.png" },
                     { src: "/images/partners/australia/9.png" },
                     { src: "/images/partners/australia/10.png" },
                     { src: "/images/partners/australia/11.png" },
                     { src: "/images/partners/australia/12.png" },
                     { src: "/images/partners/australia/13.png" },
                     { src: "/images/partners/australia/14.png" },
                     { src: "/images/partners/australia/15.png" },
                     { src: "/images/partners/australia/16.png" },
                     { src: "/images/partners/australia/17.png" },
                     { src: "/images/partners/australia/18.png" },
                     { src: "/images/partners/australia/19.png" },
                     { src: "/images/partners/australia/20.png" },
                     { src: "/images/partners/australia/21.png" },
                     { src: "/images/partners/australia/22.png" },
                     { src: "/images/partners/australia/23.png" },
                     { src: "/images/partners/australia/24.png" },
                     { src: "/images/partners/australia/25.png" },
                     { src: "/images/partners/australia/26.png" },
                  ]}
               />
            </Stack>
         </Container>
      </Layout>
   )
}

export default Partners
