import React from 'react'
import Stack from '@mui/material/Stack'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import AuthForm from '@src/Partials/AuthForm'
import Layout from '@src/Partials/Layout'
import Auth from '@src/System/Auth';

const AuthPage = ({ isAuth }: any) => {
   const auth = Auth.getAuth()

   return (
      <Layout errorPage={isAuth || auth} title="Login/Signup">
         <Stack
            height={600}
            justifyContent="center"
            alignItems="center"
         >
            <AuthForm />
            <Stack>
               <Typography fontSize={13} mt={2} textAlign="left"> Read Our <MuiLink sx={{ cursor: "pointer" }}>terms & condition</MuiLink> </Typography>
            </Stack>
         </Stack>
      </Layout>
   )
}

export default AuthPage