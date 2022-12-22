
/* eslint-disable @next/next/no-img-element */
import React, { useMemo } from 'react'
import { QuestionProps, QuestionOptions } from './types'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import katex from 'katex';


interface Props extends QuestionProps {
   option: QuestionOptions;
}


const Option = ({ option }: Props) => {

   const label = useMemo(() => {
      if (option.type === 'image') return decodeURIComponent(option.label)
      try {
         if (option.isMath) {
            return <div style={{ display: "inline-block" }} dangerouslySetInnerHTML={{
               __html: katex.renderToString(decodeURIComponent(option.label))
            }} />
         }
         return <div style={{ display: "inline-block" }} dangerouslySetInnerHTML={{
            __html: decodeURIComponent(option.label)
         }} />
      } catch (err) {
         return option.label
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps 
   }, [])


   return (
      <Stack >
         {
            option.type === "image" ? <picture style={{ display: "flex", alignItems: "center" }}>
               <img width="100%" src={option.label} alt="" />
            </picture> : <Typography component="div" fontSize={14} color="initial">{label}</Typography>
         }
      </Stack>
   )
}


export default Option

