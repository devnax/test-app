/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { ContentData } from './types'
import Stack from '@mui/material/Stack'
import ReactPlayer from 'react-player'

const Image = ({ data }: ContentData) => {

   return <Stack
      sx={{
         '& .katex': {
            fontWeight: 500,
            fontSize: "25px!important"
         }
      }}
   >
      {
         data.url_type === 'video' ? <Stack
            position="relative"
            pt={"56.25%"}
            sx={{
               '&>div': {
                  position: "absolute",
                  top: 0,
                  left: 0,
               }
            }}
         >
            <ReactPlayer
               url={data.url}
               controls
               width="100%"
               height="100%"
            />
         </Stack> : <Stack>
            <img src={data.url} style={{ width: '100%' }} alt={data.url} />
         </Stack>
      }
   </Stack>
}

export default Image