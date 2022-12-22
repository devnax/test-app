import React from 'react'
import Stact from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const _404 = () => {
   return (
      <Stact py={10} height={600} alignItems="center" justifyContent="center">
         <Typography variant="h3" fontWeight={500}>404</Typography>
         <Typography variant="h6" fontWeight={500}>Page Not Found</Typography>
      </Stact>
   )
}

export default _404
