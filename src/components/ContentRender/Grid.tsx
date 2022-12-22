import React from 'react'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Renderar from './'
import { ContentData } from './types'

const GridView = ({ childs, data }: ContentData) => {

   return <Grid container>
      {
         childs.map((col: any, idx: number) => {
            const { breakpoints } = data.columns[col.columnId] || {}
            return <Grid key={idx} item {...(breakpoints || {})}>
               <Stack spacing={4}>
                  {
                     Renderar.set(col.childs)
                  }
               </Stack>
            </Grid>
         })
      }
   </Grid>
}

export default GridView