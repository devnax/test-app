import React from 'react'
import { QuestionProps, DragDropItemProps } from '../types'
import { Droppable } from 'react-draghost'
import Stack from '@mui/material/Stack'
import QuizHandler from '../../../../../../handlers/QuizHandler';
import RenderValue from './ValueRender'
import DragDropHandler from '@src/Partials/QuizRunner/handlers/DragDropHandler'
import { withStore } from 'state-range'


interface Props extends QuestionProps {
   box: DragDropItemProps;
   index: number;
}

const Over = new Map<string, boolean>()


const RenderBox = (props: Props) => {
   const { data, box, index } = props
   const options = DragDropHandler.find({ container: box.id })
   const reportMode = QuizHandler.getMeta("reportMode")
   const answer = QuizHandler.getQuestion(data.qid)
   const isActive = QuizHandler.getMeta("activeQuestion") === answer?.qindex
   const isIncorrect = reportMode && !answer?.correct || false
   const isOver = Over.get(data.qid)

   let sx = {}
   if (!options.length) {
      sx = {
         textAlign: 'center',

         lineHeight: `${box.height}px`,

      }
   }

   const bgcolor = isActive ? "rgba(181, 234, 255, 0.5)" : "transparent"

   return (
      <Stack
         width={box.width}
         height={box.height}
         sx={{
            overflow: "hidden",
            '& .b-active': {
               borderStyle: "dashed!important",
               bgcolor: "#fffee5!important"
            }
         }}
      >
         <Droppable
            id={"_" + box.id}
            accepts={() => !reportMode}
            disabled={reportMode || false}
            style={{
               width: box.width,
               height: box.height,
               borderRadius: box.radius || "0.143em",
               backgroundColor: isIncorrect ? "rgb(255, 143, 130)" : (box.bgcolor || bgcolor),
               borderColor: isIncorrect ? "rgb(105, 11, 0)" : (box.borderColor || "#0370a7"),
               backgroundImage: box.bgimage ? `url(${box.bgimage})` : "",
               backgroundRepeat: "no-repeat",
               backgroundSize: "contain",
               backgroundPosition: "center",
               borderWidth: box.borderWidth && !isNaN(box.borderWidth as any) ? parseInt(box.borderWidth) : "1px",
               borderStyle: isOver ? "dashed" : "solid",
               color: options.length ? "#000" : "#444",
               fontWeight: "bold",
               boxShadow: options.length ? "0 0.0714em 0.143em rgb(0 0 0 / 25%)" : "",
               ...sx
            }}
            onDrag={(props: any) => {
               const { el }: { el: HTMLElement } = props
               el.style.opacity = "1"
            }}
            onOver={({ container }) => {
               container.classList.add("b-active")
               Over.set(data.qid, true)
            }}
            onOut={({ container }) => {
               container.classList.remove("b-active")
               Over.set(data.qid, false)
            }}
            onCalcel={() => {
               DragDropHandler.update({ container: null }, { container: box.id })
            }}
            onDrop={({ el }: any) => {
               if (Over.get(data.qid)) {
                  DragDropHandler.update({ container: null }, { container: box.id })
                  DragDropHandler.update({ container: box.id }, { id: el.id })
                  const answer = QuizHandler.getQuestion(data.qid)
                  if (answer) {
                     const _values = answer.value || {}
                     _values[box.id] = el.id
                     QuizHandler.update({ value: _values }, answer._id)
                  }
                  QuizHandler.activeQuestion(data.qid)
               } else {
                  DragDropHandler.update({ container: null }, { id: el.id })
               }
            }}
         >
            {
               !!!options.length && `${answer?.qindex}.${index}`
            }
            {
               options.map((option: any) => <RenderValue key={option.id} option={option} />)
            }
         </Droppable>
      </Stack>
   )
}

export default withStore(RenderBox, ({ data }) => {
   const answer = QuizHandler.getQuestion(data.qid)
   return [answer?.observe, DragDropHandler.observeStoreData()]
})