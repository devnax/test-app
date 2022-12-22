import React, { useMemo, memo } from 'react'
import { ContentData } from '../types'
import katex from 'katex';
import Stack from '@mui/material/Stack'

const Math = ({ data }: ContentData) => {
   const content = useMemo(() => {
      try {

         return katex.renderToString(decodeURIComponent(data.content))
      } catch (err) {
         return data.content
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps 
   }, [])

   return <Stack
      p={1}
      sx={{
         '& .katex': {
            fontWeight: 500,
            fontSize: "23px!important"
         },
      }}
   >
      <div dangerouslySetInnerHTML={{ __html: content }} />
   </Stack>
}

export default memo(Math)