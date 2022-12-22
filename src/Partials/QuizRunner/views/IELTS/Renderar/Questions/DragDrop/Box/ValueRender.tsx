import React from 'react'
import { DragDropItemProps } from '../types'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

interface Props {
   option: DragDropItemProps;
}

const RenderValue = (props: Props) => {
   const { option } = props

   return (
      <Stack
         id={option.id}
         sx={{
            height: "100%",
            width: "100%",
         }}
      >
         <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
               width: option.width,
               height: option.height,
               borderRadius: option.radius || 0,
               backgroundColor: option.bgcolor || "transparent",
               borderColor: option.borderColor || "transparent",
               backgroundImage: option.bgimage ? `url(${option.bgimage})` : "",
               backgroundRepeat: "no-repeat",
               backgroundSize: "contain",
               backgroundPosition: "center",
               textAlign: "center",
               justifyContent: "center",
               alignItems: "center",
               cursor: "pointer",
               borderWidth: !isNaN(option.borderWidth as any) ? parseInt(option.borderWidth) : 0,
               borderStyle: "solid",
            }}
         >
            {option.label && <Typography fontSize={16} fontWeight="bold">{option.label}</Typography>}
         </Stack>
      </Stack>
   )
}

export default RenderValue