import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import Image from 'next/image'
import SocialButtons from './SocialButtons'
import GridTitle from './GridTitle'
import LinkItem from './LinkItem'
import FooterBottom from './FooterBottom'

const Footer = () => {

  return (
    <Stack
      component="footer"
      bgcolor="secondary.main"
      pt={5}
    >
      <Stack >
        <Container>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={4}>
              <Stack spacing={2} alignItems="center" justifyContent="center">
                <Image src="/images/logo.png" alt='PIE' width={140} height={105} priority quality={100} />
                <Typography
                  variant="h3"
                  fontWeight={700}
                  fontSize={25}
                  textAlign="center"
                  color="#fff"
                >
                  PIE Academy
                </Typography>
                <SocialButtons />
              </Stack>
            </Grid>


            <Grid item xs={6} md={2}>
              <GridTitle label='Courses' />
              <List dense>
                {/* <LinkItem href="/packages" label='Packages' /> */}
                <LinkItem href="/courses/ielts" label='IELTS' />
                <LinkItem href="/courses/ged" label='GED' />
                <LinkItem href="/courses/gre" label='GRE' />
                <LinkItem href="/courses/sat" label='SAT' />
                <LinkItem href="/courses/toefl" label='TOEFL' />
                <LinkItem href="/courses/mock-test" label='Mock Test' divider={false} />
              </List>
            </Grid>


            <Grid item xs={6} md={3}>
              <GridTitle label='Company' />
              <List dense>
                <LinkItem href="/about-us" label="About Us" />
                <LinkItem href="/contact" label="Contact Us" />
                {/* <LinkItem href="/our-team" label="Our Team" /> */}
                <LinkItem href="/partners" label="Our Partners" />
                <LinkItem href="#" label="Success Story" />
                <LinkItem href="#" label="Blogs" divider={false} />
              </List>
            </Grid>

            <Grid item xs={6} md={3}>
              <GridTitle label='Services' />
              <List dense>
                <LinkItem href="/bookfreeclass" label="Book a free class" />
                <LinkItem href="#" label="Career Opportunities" />
                <LinkItem href="#" label="Franchises" />
                {/* <LinkItem href="#" label="Affiliate" divider={false} /> */}
              </List>
            </Grid>

            {/* <Grid item xs={6} md={2}>
              <GridTitle label='Support' />
              <List dense>
                <LinkItem href="/helps" label="Help Center" />
                <LinkItem href="/contact" label="Contact Us" divider={false} />
              </List>
            </Grid> */}
          </Grid>
        </Container>

      </Stack>
      <FooterBottom />
    </Stack>
  )
}


export default Footer