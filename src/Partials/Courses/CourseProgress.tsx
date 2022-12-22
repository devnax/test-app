import React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'

interface CourseProgressType {
   value?: number
}

const CourseProgress = ({ value }: CourseProgressType) => {
   value = value || 0
   return (
      <Stack>
         <Typography textAlign="right" fontWeight={600} fontSize={12}>{parseInt(value as any)}% COMPLETED</Typography>
         <LinearProgress variant="determinate" value={value} />
      </Stack>
   )
}

export default CourseProgress