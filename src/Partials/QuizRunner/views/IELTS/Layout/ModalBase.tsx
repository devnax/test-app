import React from 'react'
import Stack from '@mui/material/Stack'
import Handler from '@src/Partials/QuizRunner/handlers/QuizHandler'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase'
import closeIcon from '../Images/close-icon.png'
import useDrag from '@src/Partials/QuizRunner/helpers/useDrag'
import Scrollbar from '@libs/Scrollbar'
import { ModalProps } from '@src/Partials/QuizRunner/handlers/QuizHandler'


const ModalHeader = ({ title }: ModalProps) => {
   return (
      <Stack
         borderBottom={1}
         borderColor={"#a80"}
         p={"4px 8px"}
         direction="row"
         alignItems="center"
         justifyContent="space-between"
         bgcolor={"#db0"}
         sx={{
            cursor: "move",
            userSelect: "none"
         }}
      >
         {typeof title === "string" ? <Typography variant="body1" color="#111">{title}</Typography> : title}
         <ButtonBase disableRipple onClick={() => Handler.deleteMeta("showModal")}>
            <picture>
               <img src={closeIcon.src} alt="" />
            </picture>
         </ButtonBase>
      </Stack>
   )
}


const ModalView = () => {
   const [{ pos }, ref, handler] = useDrag()
   const modalProps = Handler.getMeta("showModal") as ModalProps

   const { dialog, title, content, width, height, draggable, ...rest } = modalProps
   if (dialog) {
      return <></>
   }

   const winWidth = (window.innerWidth / 2) - ((modalProps?.width || 800) / 2)
   const winHeight = (window.innerHeight / 2) - ((modalProps?.height || 800) / 2)

   return (
      <Stack
         position="fixed"
         top={pos.top || winHeight}
         left={pos.left || winWidth}
         maxWidth={width || 800}
         width="100%"
         height="100%"
         maxHeight={height || 600}
         bgcolor={"#fff046"}
         borderRadius={1}
         overflow="hidden"
         boxShadow={24}
         ref={draggable !== false ? ref : undefined}
         sx={{
            " & *": {
               color: "#000"
            }
         }}
         {...rest}
      >
         <Stack ref={handler}>
            <ModalHeader {...modalProps} title={title} />
         </Stack>
         <Scrollbar style={{ flex: 1 }}>
            <Stack height="100%">
               {content}
            </Stack>
         </Scrollbar>
      </Stack>
   )
}

const initModal = () => {
   const modalProps = Handler.getMeta("showModal")
   if (!modalProps) {
      return <></>
   }
   return <ModalView />
}

export default initModal