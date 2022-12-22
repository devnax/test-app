import React, { useState } from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/ButtonBase'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import ArrowDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from '@mui/material/Typography'
import { AnotationMarker } from '@src/Partials/QuizRunner/views/Anotation'


const ColorBox = ({ color, onClick }: { color: string, onClick?: (c: string) => void }) => {
   return (
      <Stack
         bgcolor={color}
         width={30}
         height={26}
         border={1}
         borderColor="#fff"
         sx={{
            cursor: "pointer"
         }}
         onClick={() => {
            AnotationMarker.mark({
               onBeforeMark: (span) => {
                  span.style.background = color
               }
            })
            onClick && onClick(color)
         }}
      >

      </Stack>
   )
}

const HighlightButton = () => {
   const [showColors, setShowColors] = useState(false)
   const [activeColor, setActiveColor] = useState("#fff")

   return (
      <Stack
         position="relative"
      >
         <Stack
            direction="row"
            spacing={.5}
            color="#fff"
            sx={{
               '&:hover': {
                  color: "yellow"
               }
            }}
         >
            <Stack
               direction="row"
               sx={{ cursor: "pointer" }}
               onClick={() => {
                  setShowColors(!showColors)
               }}
            >
               <ColorBox color={activeColor === '#fff' ? "transparent" : activeColor} onClick={(c) => setActiveColor(c)} />
               <ArrowDownIcon />
            </Stack>
            <Button
               disableRipple
               sx={{
                  bgcolor: "transparent",
                  fontSize: 16,
               }}
               onClick={() => {
                  AnotationMarker.mark({
                     onBeforeMark: (span) => {
                        span.style.background = activeColor
                     }
                  })
               }}
            >
               Highlight (J)
            </Button>
         </Stack>

         {
            showColors && <ClickAwayListener onClickAway={() => setShowColors(false)}>
               <Stack
                  position="absolute"
                  top="100%"
                  left={0}
                  bgcolor="#006DAA"
                  p={1}
                  spacing={1}
                  width={180}
                  zIndex={999999}
               >
                  <Stack
                     direction="row"
                     spacing={.3}
                  >
                     <ColorBox
                        color="rgb(253, 254, 0)"
                        onClick={(c) => setActiveColor(c)}
                     />
                     <ColorBox
                        color="rgb(0, 254, 0)"
                        onClick={(c) => setActiveColor(c)}
                     />
                     <ColorBox
                        color="rgb(255, 172, 186)"
                        onClick={(c) => setActiveColor(c)}
                     />
                     <ColorBox
                        color="rgb(67, 191, 250)"
                        onClick={(c) => setActiveColor(c)}
                     />
                     <ColorBox
                        color="rgb(252, 1, 0)"
                        onClick={(c) => setActiveColor(c)}
                     />
                  </Stack>
                  <Stack
                     direction="row"
                     spacing={.5}
                     alignItems="center"
                     sx={{
                        cursor: "pointer",
                        '&:hover *': {
                           color: "yellow!important"
                        }
                     }}
                     onClick={() => setActiveColor("#fff")}
                  >
                     <ColorBox
                        color="#fff"
                     />
                     <Typography variant="body1" color="#fff" fontSize={14}>Remove Highlight</Typography>
                  </Stack>
               </Stack>
            </ClickAwayListener>
         }
      </Stack>
   )
}

export default HighlightButton