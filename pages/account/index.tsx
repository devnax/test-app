import React from 'react'
import Stack from '@mui/material/Stack'
import Layout from '@src/Partials/Layout'
import Auth from '@src/System/Auth';
import Header from '@contents/Profile/Header'
import TabsPanel from '@contents/Profile/Tabs'

const AuthPage = ({ isAuth }: any) => {
   const auth = Auth.getAuth()

   return (
      <Layout errorPage={!(isAuth || auth)} title={auth ? auth.firstname + " " + auth.lastname : "My Account"}>
         <Stack >
            <Header />
            <TabsPanel />
         </Stack>
      </Layout>
   )
}

export default AuthPage