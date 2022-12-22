import React from 'react'
import Layout from '@src/Partials/Layout'
import ErrorPage from '@contents/404'

const Page404 = () => {
   return (
      <Layout title='404 Page not found'>
         <ErrorPage />
      </Layout>
   )
}


export default Page404