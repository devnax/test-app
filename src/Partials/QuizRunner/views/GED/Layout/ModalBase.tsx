import React from 'react'
import Stack from '@mui/material/Stack'
import Handler from '@src/Partials/QuizRunner/handlers/QuizHandler'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase'
import closeIcon from '../Images/close.png'
import useDrag from '@src/Partials/QuizRunner/helpers/useDrag'
import Scrollbar from '@libs/Scrollbar'
import { ModalProps } from '@src/Partials/QuizRunner/handlers/QuizHandler'


const ModalHeader = (props: ModalProps) => {
   return (
      <Stack
         borderBottom={1}
         borderColor="#fff"
         p="8px 8px"
         direction="row"
         alignItems="center"
         justifyContent="space-between"
         sx={{
            cursor: "move",
            userSelect: "none"
         }}
      >
         <Typography variant="body1" color="#fff">{props.title}</Typography>
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
   const modalProps = Handler.getMeta("showModal")
   if (!modalProps) {
      return <></>
   }

   const { title, content, width, height, draggable, ...rest } = modalProps

   const winWidth = (window.innerWidth / 2) - ((modalProps?.width || 800) / 2)
   const winHeight = (window.innerHeight / 2) - ((modalProps?.height || 800) / 2)


   return (
      <Stack
         position="fixed"
         top={pos.top || winHeight}
         left={pos.left || winWidth}
         maxWidth={width}
         width="100%"
         height="100%"
         maxHeight={height || 800}
         bgcolor="#006DAA"
         ref={draggable !== false ? ref : undefined}
         {...rest}
      >
         <Stack ref={handler}>
            <ModalHeader {...modalProps} title={title} />
         </Stack>
         <Scrollbar style={{ flex: 1 }}>
            <Stack p={1} height="100%">
               {content}
            </Stack>
         </Scrollbar>
         <Stack bgcolor="#006DAA" height={10}></Stack>
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