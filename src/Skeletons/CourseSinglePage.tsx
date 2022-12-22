import React from 'react'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import SkeletonView, { SkeletonProps } from '@mui/material/Skeleton'
import Page from './Page'

const Skeleton = (props: SkeletonProps) => {
   return <SkeletonView sx={{ transform: "initial!important" }} {...props} />
}

const Header = () => {
   return <Stack bgcolor="divider" py={15} >
      <Container>
         <Grid container>
            <Grid item xs={12} md={8}>
               <Stack spacing={1}>
                  <Skeleton width={500} height={50} />
                  <Skeleton width="80%" height={15} />
                  <Skeleton width="60%" height={15} />
               </Stack>
               <Stack direction="row" spacing={2} mt={5}>
                  <Skeleton width={150} height={100} />
                  <Skeleton width={150} height={100} />
                  <Skeleton width={150} height={100} />
               </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
               <Stack spacing={2}>
                  <Skeleton height={150} />
                  <Skeleton width={150} />
                  <Stack direction="row" spacing={1}>
                     <Skeleton width={60} height={20} />
                     <Skeleton width={60} height={20} />
                  </Stack>
                  <Skeleton height={45} />
               </Stack>
            </Grid>
         </Grid>
      </Container>
   </Stack>
}


interface Props {
   topic?: boolean;
}

const SingleCourse = ({ topic }: Props) => {
   return (
      <Box>
         {!topic && <Header />}
         <Stack py={4} >
            <Container>
               <Grid container spacing={2}>
                  <Grid item xs={12} md={8} sx={{ p: 2 }}>
                     <Page />
                  </Grid>
                  <Grid item xs={12} md={4}>
                     <Stack spacing={1} p={1} borderRadius={2} border={1} borderColor="divider">
                        <Skeleton height={45} />
                        <Skeleton height={45} />
                        <Skeleton height={45} />
                        <Skeleton height={45} />
                        <Skeleton height={45} />
                        <Skeleton height={45} />
                        <Skeleton height={45} />
                        <Skeleton height={45} />
                        <Skeleton height={45} />
                        <Skeleton height={45} />
                        <Skeleton height={45} />
                        <Skeleton height={45} />
                        <Skeleton height={45} />
                     </Stack>
                  </Grid>
               </Grid>
            </Container>
         </Stack>
      </Box>
   )
}


export default SingleCourse