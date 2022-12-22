/* eslint-disable @next/next/no-css-tags */
import { Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Script from 'next/script'
import Head from 'next/head'

const Calculator = () => {
   useEffect(() => {
      const TI30 = (window as any).TI30
      if (TI30) {
         new TI30("./30mv.config.json")
      }
   }, [])

   return (
      <Stack>
         <Typography variant="h6" mb={0} px={1}>Calculator</Typography>
         <Head>
            <link rel="stylesheet" href='/30mv/ti30mv-styles-min.css' />
         </Head>
         <Script src="/30mv/ti30mv-min.js" onLoad={() => {
            const TI30 = (window as any).TI30
            new TI30("./30mv.config.json")
         }} />
         <div id="calculatorDiv" className="calculatorDiv" tabIndex={0} style={{ zIndex: 0, width: 293 }}>
            <div id="displayDiv" className="displayDiv">
               <canvas width="192" height="75" id="display"></canvas>
            </div>
         </div>
      </Stack>
   )
}
export default Calculator