import React from "react"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import { withStore } from 'state-range'
import CloseIcon from '@mui/icons-material/CloseRounded';
import Typography from "@mui/material/Typography"
import AnimateBox from "../../components/AnimateBox"
import { AnimatePresence } from "framer-motion"
import Scrollbar from '@libs/Scrollbar'
import Handler from './Handler'
import { ToastRowProps } from './types'



const _ToastView = () => {
   const allToast: any = Handler.findAll()


   return (
      <Stack
         position='fixed'
         bottom={0}
         right={0}
         zIndex={99999999999}
         width={350}
         maxHeight="100%"
      >
         <Scrollbar style={{ overflowX: 'hidden' }}>
            <Stack spacing={1.5} p={allToast.length && 2}>
               <AnimatePresence>

                  {
                     allToast.map(({ _id, title, icon, content, type, onClick, ...rest }: ToastRowProps) => {
                        let isDefault = type === "default"


                        return (
                           <AnimateBox key={_id} type="fadeInRight">
                              <Stack
                                 direction='row'
                                 justifyContent="space-between"
                                 alignItems="center"
                                 p={.5}
                                 px={1.5}
                                 borderRadius={2}
                                 boxShadow={3}
                                 bgcolor='background.paper'
                                 minHeight={60}
                                 spacing={2}
                                 onMouseEnter={() => Handler.pauseTime(_id)}
                                 onMouseLeave={() => Handler.startTime(_id)}
                                 borderBottom={3}
                                 borderColor={isDefault ? 'transparent' : `${type}.main`}
                                 position="relative"
                              >
                                 {
                                    icon && <Box>
                                       {icon}
                                    </Box>
                                 }
                                 <Box
                                    flex={1}
                                    sx={{
                                       cursor: onClick ? "pointer" : "initial"
                                    }}
                                    onClick={() => {
                                       onClick && onClick({ _id, title, icon, content, type, ...rest })
                                    }}
                                 >
                                    <Typography variant="body1" fontWeight={500} fontSize={15}>{title}</Typography>
                                    {
                                       content && <Typography variant="body1" fontSize={12} color={(theme) => theme.palette.mode === 'dark' ? "grey.200" : "grey.700"} fontWeight={600} lineHeight="15px">
                                          {content}
                                       </Typography>
                                    }
                                 </Box>
                                 <Box
                                    position="absolute"
                                    top={2}
                                    right={2}
                                 >
                                    <IconButton size="small" onClick={() => Handler.close(_id)}>
                                       <CloseIcon sx={{ fontSize: "16px!important" }} />
                                    </IconButton>
                                 </Box>
                              </Stack>
                           </AnimateBox>
                        )
                     })
                  }
               </AnimatePresence>
            </Stack>
         </Scrollbar>
      </Stack>
   )
}

export default withStore(_ToastView)