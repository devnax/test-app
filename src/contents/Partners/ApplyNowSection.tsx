import React from 'react'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ArrowRightIcon from '@mui/icons-material/ArrowRightAltRounded';
import Button from '@mui/material/Button'
import Link from 'next/link';


const ApplyNowSection = () => {
   return (
      <Stack pt={10} >
         <Container >
            <Stack
               mb={4}
               borderRadius={2}
               p={3}
               bgcolor="#121220"
               direction="row"
               alignItems="center"
               spacing={2}
            >
               <Stack direction="row" alignItems="center" flex={1} spacing={2}>
                  <Stack width={120} justifyContent="center">
                     <picture style={{ display: "inline-block" }}>
                        <img width={80} src="/images/apply-now.png" alt="Apply Now" />
                     </picture>
                  </Stack>
                  <Stack>
                     <Typography variant="h4" color="#fff" mb={1}>Study Abroad</Typography>
                     <Typography variant="body2" color="#fff" sx={{ opacity: .8 }}>
                        Since the very inception, PIE International Education has always been keen about the future of our dear students. We have successfully sent over 5K+ candidates abroad so far which are currently residing in Canada, USA, Malaysia, Australia and in the UK. We offer expert consultancy to our students, support them in researching their top university and program choices, apply for them, celebrate the reception of their offer letters, and provide all necessary assistance required for the VISA procedure.
                     </Typography>

                  </Stack>
               </Stack>
               <Stack>
                  <Link href="/free-consultation">
                     <Button
                        endIcon={<ArrowRightIcon />}
                        variant="contained"
                        href="/free-consultation"
                        size="large"
                     >
                        Free Consultation
                     </Button>
                  </Link>
               </Stack>
            </Stack>
         </Container>
      </Stack>
   )
}

export default ApplyNowSection