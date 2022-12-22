import React from 'react'
import { QuestionProps, DragDropItemProps } from '../types'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Droppable } from 'react-draghost'
import DragDropHandler from '@src/Partials/QuizRunner/handlers/DragDropHandler'
import { withStore } from 'state-range'
import QuizHandler from '@src/Partials/QuizRunner/handlers/QuizHandler'

interface Props extends QuestionProps {
   option: DragDropItemProps
}

const RenderOption = (props: Props) => {
   const option = DragDropHandler.findFirst({ container: null, id: props.option.id })
   const reportMode = QuizHandler.getMeta("reportMode")
   return (
      <Droppable
         id={"_" + props.option.id}
         accepts={() => false}
         disabled={reportMode || false}
         style={{
            height: props.option.height,
            width: props.option.width,
         }}
         className={option ? "drop-opt" : ""}
         onDrag={(props: any) => {
            const { el }: { el: HTMLElement } = props
            el.style.opacity = "1"
         }}
      >
         {
            option && <Stack
               id={option.id}
               sx={{
                  flexDirection: option.vertical ? "row" : "column",
                  width: option.width || 'auto',
                  height: option.height || 'auto',
                  borderRadius: option.radius || '0.143em',
                  backgroundColor: option.bgcolor || "#dde3ee",
                  borderColor: option.borderColor || "transparent",
                  backgroundImage: option.bgimage ? `url(${option.bgimage})` : "",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  textAlign: "center",
                  fontWeight: "bold",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  borderWidth: !isNaN(option.borderWidth as any) ? parseInt(option.borderWidth as any) : 0,
                  borderStyle: "solid",
                  boxShadow: "0 0.0714em 0.143em rgb(0 0 0 / 25%)",
               }}
            >
               {option.label && <Typography color="#000" fontSize={16} fontWeight="bold">{option.label}</Typography>}
            </Stack>
         }

      </Droppable>
   )
}

export default withStore(RenderOption)