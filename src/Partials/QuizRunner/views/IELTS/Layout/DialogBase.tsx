import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase'
import closeIcon from '../Images/close-icon.png'
import Scrollbar from '@libs/Scrollbar'
import QuizHandler, { ModalProps } from '@src/Partials/QuizRunner/handlers/QuizHandler'
import { withStore } from 'state-range';


const ModalHeader = ({ title, onClose }: ModalProps & { onClose: Function }) => {
   return (
      <Stack
         borderBottom={1}
         borderColor={"#000"}
         p={"6px 16px"}
         direction="row"
         alignItems="center"
         justifyContent="space-between"
         bgcolor={"#000"}
         sx={{
            userSelect: "none"
         }}
      >
         {typeof title === "string" ? <Typography variant="h5" color="#fff">{title}</Typography> : title}
         <ButtonBase disableRipple onClick={() => onClose()}>
            <picture>
               <img src={closeIcon.src} alt="" />
            </picture>
         </ButtonBase>
      </Stack>
   )
}


// eslint-disable-next-line react/display-name
const Transition = React.forwardRef((props: any, ref) => <Slide direction="down" ref={ref} {...props} />);

const BaseDialog = () => {
   const modalProps = QuizHandler.getMeta("showModal") as ModalProps
   const [props, setProps] = useState<any>(modalProps)
   const [open, setOpen] = useState(Boolean(props))

   useEffect(() => {
      if (modalProps && modalProps.dialog) {
         setProps(modalProps)
         setOpen(true)
      } else {
         onClose()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [modalProps])

   const { dialog, footer, title, content, width, height, draggable, layerProps, onClose: ONCLOSE, ...rest } = props || {}
   const onClose = () => {
      if (!props) return
      setOpen(false)
      setTimeout(() => {
         setProps(null)
         ONCLOSE && ONCLOSE()
         QuizHandler.deleteMeta("showModal")
      }, 300);
   }

   if (!props) {
      return <></>
   }

   return (
      <Dialog
         open={open}
         TransitionComponent={Transition}
         keepMounted
         onClose={() => onClose()}
         {...layerProps}
         sx={{
            zIndex: 999999999999,
            ...(layerProps?.sx || {})
         }}
         maxWidth="lg"
      >
         <Stack
            width={width || 800}
            height={height || 600}
            bgcolor="#dce5f6"
            borderRadius={1}
            overflow="hidden"
            boxShadow={24}
            sx={{
               color: "#000",
               '& *': {
                  fontFamily: "Arial,Helvetica,sans-serif, helvetica neue regular,helvetica neue,Roboto!important"
               }
            }}
            {...rest}
         >
            <Stack >
               <ModalHeader {...modalProps} title={title} onClose={onClose} />
            </Stack>
            <Scrollbar style={{ flex: 1 }}>
               <Stack height="100%">
                  {content}
               </Stack>
            </Scrollbar>
            {
               footer && footer
            }
         </Stack>
      </Dialog>
   );
}


export default withStore(BaseDialog, () => {
   return [QuizHandler.observeMeta("showModal")]
})