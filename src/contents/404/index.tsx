import React from 'react'
import { Button, Container, Stack, Typography } from '@mui/material'
import Link from 'next/link'

const _404 = () => {
   return (
      <Container maxWidth="md">
         <Stack
            height={700}
            alignItems="center"
            justifyContent="center"
            textAlign="center"
         >
            <picture>
               <img width={200} src='/images/error-404.png' alt="Page Not found" />
            </picture>
            <Typography variant="h3" mt={4} fontWeight={300}>It looks like the link pointing here was faulty.</Typography>
            <Typography variant="h5" my={4}>This page doesn&apos;t seem to exist.</Typography>
            <Link href="/courses" scroll={false}>
               <Button variant="contained">Browse courses</Button>
            </Link>
         </Stack>
      </Container>
   )
}


export default _404