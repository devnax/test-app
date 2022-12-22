
/* eslint-disable @next/next/no-img-element */
import React, { useMemo } from 'react'
import { QuestionProps, QuestionOptions } from './types'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import katex from 'katex';
import NumberToLatter from '@src/Partials/QuizRunner/helpers/numberToLatter'
import Anotation from '@src/Partials/QuizRunner/views/Anotation'

interface Props extends QuestionProps {
   option: QuestionOptions;
   index: number;
   onClick: () => void;
   checked?: boolean;
   bgcolor?: string
}


const Option = ({ data, option, index, onClick, checked, bgcolor }: Props) => {

   const label = useMemo(() => {
      if (!option.label) return
      if (option.type === 'image') return decodeURIComponent(option.label)
      try {
         if (option.isMath) {
            return <div style={{ display: "inline-block" }} dangerouslySetInnerHTML={{
               __html: katex.renderToString(decodeURIComponent(option.label))
            }} />
         }
         return <Anotation id={data.qid + index} sx={{ display: "inline-block" }} content={decodeURIComponent(option.label)} />
      } catch (err) {
         return option.label
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps 
   }, [])


   let prefix = ''

   switch (data.optionPrefix) {
      case "LETTER_UPPER":
         prefix = NumberToLatter(index + 1)
         break;
      case "LETTER_LOWER":
         prefix = NumberToLatter(index + 1).toLowerCase()
         break;
      case "ROMAN_UPPER":
         prefix = NumberToLatter(index + 1, "ROMAN")
         break;
      case "ROMAN_LOWER":
         prefix = NumberToLatter(index + 1, "ROMAN").toLowerCase()
         break;
      case "NUMBER":
         prefix = (index + 1).toString()
         break;
   }
   if (prefix) {
      prefix += data.prefixSeparator
   }

   return (
      <Stack
         p={data.inline ? 0 : 1}
         borderRadius={1}
         direction="row"
         alignItems="center"
         justifyContent={data.inline ? "center" : "flex-start"}
         spacing={1}
         component="label"
         bgcolor={bgcolor}
         display={data.inline ? "block" : "flex"}
         sx={{
            '& input': {
               m: 0
            }
         }}
      >
         <input type="checkbox" onChange={onClick} checked={checked || false} />
         {
            label && <Stack flex={1} direction="row" spacing={.5} alignItems="center" sx={{ "& *": { cursor: "pointer!important" } }}>
               <Typography component="div" variant="body1" color="initial">{prefix}</Typography>
               {
                  option.type === "image" ? <picture style={{ display: "flex", alignItems: "center" }}>
                     <img width="100%" src={option.label} alt="" />
                  </picture> : <Typography component="div" variant="body1" color="initial">{label}</Typography>
               }
            </Stack>
         }

      </Stack>
   )
}


export default Option

