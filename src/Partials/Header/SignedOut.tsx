import React from 'react'
import { Button } from '@mui/material'
import Link from 'next/link';

const SignedIn = () => {
   return (
      <>
         <Link href="/auth">
            <Button
               variant="contained"
               href="/auth"
            >
               Login/Signup
            </Button>
         </Link>
      </>
   )
}

export default SignedIn