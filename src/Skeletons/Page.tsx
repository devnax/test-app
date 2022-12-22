import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const H1 = () => <Skeleton height={60} width={"70%"} />
const Paragraph = () => {
   return (
      <Stack>
         <Skeleton />
         <Skeleton />
         <Skeleton />
         <Skeleton width="80%" />
      </Stack>
   )
}

const Article = () => {
   return (
      <Stack>
         <H1 />
         <Skeleton width={"50%"} />
         <Paragraph />
      </Stack>
   )
}

const Page = () => {
   return (
      <Stack spacing={3}>
         <Article />
         <Article />
         <Article />
         <Article />
         <Article />
         <Article />
      </Stack>
   )
}

export default Page