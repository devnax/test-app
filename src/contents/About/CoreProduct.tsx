import React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import { alpha } from '@mui/material/styles'
import Link from 'next/link'



const Overview = () => {
   return (
      <Stack py={10} pt={3} bgcolor="background.paper">
         <Container>
            <Grid container alignItems="center">
               <Grid item xs={12} md={7} p={5}>
                  <Stack mb={3}>
                     <Typography variant="h4" fontSize={18} mb={2}>
                        American High School Diploma
                     </Typography>
                     <Typography variant="body1" >
                        PIE also provides higher education services where students in their 10th grade are eligible to enroll to get a American High School Diploma ,i.e, GED , an American High School Equivalency Test which is often a prerequisite requirement for many universities both home & abroad.
                     </Typography>
                  </Stack>
                  <Stack>
                     <Typography variant="h4" fontSize={18} mb={2}>
                        Test Prep
                     </Typography>
                     <Typography variant="body1" >
                        PIE International Education aims in helping to transform individuals & communities through excellent teaching, research, innovation and engagement by providing quality education to the students preparing them for their higher education both home & abroad. We prepare our students for the following courses often required for scholarships and admissions to our partner universities all around the world :
                     </Typography>

                     <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        mt={2}
                     >
                        <Link href="/courses/ged">
                           <Stack
                              borderRadius={2}
                              p={2}
                              bgcolor={alpha("#007FA3", .05)}
                              width={150}
                              sx={{
                                 transition: "all .3s",
                                 cursor: "pointer",
                                 '&:hover': {
                                    bgcolor: "#007FA3",
                                    color: "#fff"
                                 }
                              }}
                           >
                              <Typography textAlign="center" variant="h5" >GED</Typography>
                           </Stack>
                        </Link>
                        <Link href="/courses/ielts">
                           <Stack
                              borderRadius={2}
                              p={2}
                              bgcolor={alpha("#D12F33", .05)}
                              width={150}
                              sx={{
                                 transition: "all .3s",
                                 cursor: "pointer",
                                 '&:hover': {
                                    bgcolor: "#D12F33",
                                    color: "#fff"
                                 }
                              }}
                           >
                              <Typography textAlign="center" variant="h5" >IELTS</Typography>
                           </Stack>
                        </Link>
                        <Link href="/courses/sat">
                           <Stack
                              borderRadius={2}
                              p={2}
                              bgcolor={alpha("#0498DC", .05)}
                              width={150}
                              sx={{
                                 transition: "all .3s",
                                 cursor: "pointer",
                                 '&:hover': {
                                    bgcolor: "#0498DC",
                                    color: "#fff"
                                 }
                              }}
                           >
                              <Typography textAlign="center" variant="h5" >SAT</Typography>
                           </Stack>
                        </Link>
                        <Link href="/courses/gre">
                           <Stack
                              borderRadius={2}
                              p={2}
                              bgcolor={alpha("#014F8E", .05)}
                              width={150}
                              sx={{
                                 transition: "all .3s",
                                 cursor: "pointer",
                                 '&:hover': {
                                    bgcolor: "#014F8E",
                                    color: "#fff"
                                 }
                              }}
                           >
                              <Typography textAlign="center" variant="h5" >GRE/GMAT</Typography>
                           </Stack>
                        </Link>

                     </Stack>
                  </Stack>
               </Grid>
               <Grid item xs={12} md={5} p={5}>
                  <picture>
                     <img width="100%" src="/images/pie-academy.png" alt="Core Product" />
                  </picture>
               </Grid>
            </Grid>
         </Container>
      </Stack>
   )
}

export default Overview