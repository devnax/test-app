import React, { ReactNode } from 'react'
import Stack, { StackProps } from '@mui/material/Stack'
import Header from './Header'
import Footer from './Footer'
import ErrorPage from './404'
import Head from 'next/head'


interface Props extends StackProps {
  children: ReactNode;
  errorPage?: boolean;
  title?: string;
  headerProps?: StackProps
}

const Layout = ({ children, errorPage, title, headerProps, ...rest }: Props) => {
  return (
    <Stack {...rest}>
      <Head>
        <title>{title}</title>
      </Head>
      <Header {...headerProps} />
      {errorPage ? <ErrorPage /> : children}
      <Footer />
    </Stack>
  )
}

export default Layout