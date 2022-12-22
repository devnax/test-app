import React from 'react'
import { DragDropItemProps } from '../types'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import QuizHandler from '@src/Partials/QuizRunner/handlers/QuizHandler';


interface Props {
   option: DragDropItemProps;
}

const RenderValue = (props: Props) => {
   const { option } = props
   const reportMode = QuizHandler.getMeta("reportMode")

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
               borderWidth: option.borderWidth || 0,
               borderStyle: "solid",
               '&:hover': {
                  border: reportMode ? "" : "2px solid blue"
               }
            }}
         >
            {option.label && <Typography variant="body1" lineHeight="20px" fontSize={14} fontWeight={600}>{option.label}</Typography>}
         </Stack>
      </Stack>
   )
}

export default RenderValue