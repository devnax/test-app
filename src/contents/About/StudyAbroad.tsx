import * as React from 'react';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { alpha } from '@mui/material/styles'
import { useRouter } from 'next/router';

interface FlagItemProps {
   title: string;
   src: string;
}

const FalgItem = ({ title, src }: FlagItemProps) => {
   const router = useRouter()
   return (
      <Grid item xs={6} md={4}>
         <Stack
            p={1}
            border={1}
            borderColor="transparent"
            borderRadius={2}
            direction="row"
            alignItems="center"
            spacing={2}
            bgcolor={t => alpha(t.palette.primary.main, .05)}
            sx={{
               cursor: "pointer",
               '&:hover': {
                  borderColor: "primary.main",
                  '& h6': {
                     color: "primary.main"
                  }
               }
            }}
            onClick={() => {
               router.push(`/study-abroad`)
            }}
         >
            <picture>
               <img width={40} src={src} alt={"Study Abroad with PIE - " + title} />
            </picture>
            <Typography variant="h6" >{title}</Typography>
         </Stack>
      </Grid>
   )
}

const StudyAborad = () => {

   return (
      <Stack
         minHeight={600}
         sx={{ bgcolor: 'background.paper' }}
         alignItems="center"
         justifyContent="center"
         py={15}
      >
         <Container >
            <Grid container spacing={3} alignItems="center">
               <Grid item xs={12} md={7}>
                  <Box>
                     <Typography
                        variant="h2"
                        mb={2}
                     >
                        Study Abroad
                     </Typography>
                     <Typography variant="body1" fontSize={18} mb={2}>Since the very inception, PIE International Education has always been keen about the future of our dear students. We have successfully sent over 5K+ candidates abroad so far which are currently residing in Canada, USA, Malaysia and in the UK. We offer expert consultancy to our students, support them in researching their top university and program choices, apply for them, celebrate the reception of their offer letters, and provide all necessary assistance required for the VISA procedure.</Typography>
                     <Grid container spacing={1} mt={3}>
                        <FalgItem
                           title="Canada"
                           src="/images/canada-flag.png"
                        />
                        <FalgItem
                           title="USA"
                           src="/images/usa-flag.png"
                        />
                        <FalgItem
                           title="UK"
                           src="/images/uk-flag.png"
                        />
                        <FalgItem
                           title="Malaysia"
                           src="/images/malaysia-flag.png"
                        />
                        <FalgItem
                           title="Australia"
                           src="/images/australia-flag.png"
                        />
                     </Grid>
                  </Box>
               </Grid>
               <Grid item xs={12} md={5}>
                  <Stack >
                     <picture>
                        <img width="100%" src="/images/study-abroad.png" alt="Study Abroad with PIE" />
                     </picture>
                  </Stack>
               </Grid>
            </Grid>
         </Container>
      </Stack>
   );
}


export default StudyAborad