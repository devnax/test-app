import type { NextPage } from 'next'
import Layout from '@src/Partials/Layout'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Link from 'next/link'


const RefundPolicy: NextPage = () => {
   return (
      <Layout title="Refund policy">
         <Stack bgcolor="primary.main" py={4}>
            <Typography
               variant="h2"
               textAlign="center"
               color='#fff'
            >Refund policy</Typography>
         </Stack>
         <Container>
            <Stack
               bgcolor="background.paper"
               p={4}
               my={3}
               spacing={2}
               borderRadius={2}
               sx={{
                  '& a': {
                     color: "primary.main"
                  }
               }}
            >
               <h2 >PIE Academy Money Back Guarantee &amp; Refund Policy</h2>
               <p>We at <strong><Link href="/" passHref><a>PIE Academy</a></Link></strong>  want you to be completely happy with any service you buy from us. If you have any questions, concerns, or problems, please let us know by  <strong><Link href="/contact" passHref><a>clicking here</a></Link></strong>
               </p>
               <h2 >Refunds for PIE Academy courses</h2>
               <p>When you purchase one of our <strong><Link href="/courses" passHref><a>Online courses or services</a></Link></strong>  and are unable to follow the course due to technical issues, we will refund you. If you&rsquo;ve gone into the course and have completed sections, we will no longer offer a refund. However: if you&rsquo;re not happy, please email us<strong> </strong>, we would love to know how we can improve. Simply replying to your purchase email is sufficient.</p>
               <p><em>Refunds for the products mentioned above only apply to the initial purchase or term., and refunds do not apply to renewals.</em></p>
            </Stack>
         </Container>
      </Layout >
   )
}

export default RefundPolicy
