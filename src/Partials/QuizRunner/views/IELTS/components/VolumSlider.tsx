import React, { useState, useEffect } from 'react'
import Slider from '@mui/material/Slider'
import Stack from '@mui/material/Stack'
import QuizHandler from "@src/Partials/QuizRunner/handlers/QuizHandler"
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const VolumeSlider = () => {
   const [val, setVal] = useState(1)
   const player = QuizHandler.getAudioPlayer()
   useEffect(() => {
      if (player) {
         player.setVolume(val)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [val])
   return (
      <Stack width={90} direction="row" alignItems="center" spacing={1}>
         <VolumeUpIcon />
         <Slider
            min={0}
            max={1}
            step={.1}
            value={val}
            onChange={(_e, v: any) => {
               setVal(v)
            }}
            sx={{
               height: 8,
               color: "#fff",
               '& .MuiSlider-track': {
                  border: 'none',
               },
               '& .MuiSlider-thumb': {
                  width: 16,
                  height: 16,
                  backgroundColor: '#fff',
                  '&:before': {
                     boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                  },
                  '&:hover, &.Mui-focusVisible, &.Mui-active': {
                     boxShadow: 'none',
                  },
               },
            }}
         />
      </Stack>
   )
}



export default VolumeSlider