import React from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

const Loading = () => {
   return (
      <>
         <Stack 
            gap={1}
            direction="row"
            p={1.5}
         >
            <Box>
               <Skeleton variant="circular" width={40} height={40} />
            </Box>
            <Box flex={1}>
               <Skeleton variant="text" />
               <Skeleton variant="text" width={100} height={10}/>
               <Skeleton variant="text" height={40}/>
            </Box>
         </Stack>
      </>
   )
}


// eslint-disable-next-line
export default ({number}: {number: number}) => {
   const items = []
   for(let i = 0; i < number; i++){
      items.push(<Loading key={i}/>)
   }
   return <>{items}</>
}