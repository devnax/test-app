import React from 'react'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'

const Loading = () => {
   return (
      <Stack
         position="fixed"
         zIndex={9999999999}
         left={0}
         top={0}
         bottom={0}
         right={0}
         alignItems="center"
         justifyContent="center"
         bgcolor="rgba(0,0,0,.3)"
      >
         <CircularProgress color="info" />
      </Stack>
   )
}

export default Loading