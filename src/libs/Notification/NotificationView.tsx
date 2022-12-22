import React, { FC, useEffect } from 'react'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { isDarkMode } from 'mui-themex'
import Scrollbar from '@libs/Scrollbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/CloseRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import Loading from './Loading'
import Handler from './Handler'
import { NotificationProps } from './types'
import Dropdown from '../Dropdown'
import { withStore } from 'state-range'
import { DropdownArrayType } from '../Dropdown/types'



const Item: FC<NotificationProps> = ({ id, title, icon, content, created, read }) => {
   const isDark = isDarkMode()
   const { onItemClick } = Handler.setting()
   const itemsMenu = Handler.getItemMenu()


   return (
      <>
         <Stack
            gap={1}
            direction="row"
            p={1.5}
            position="relative"
            sx={{
               cursor: 'pointer',
               '&:hover': {
                  bgcolor: "rgba(0,0,0,.05)"
               }
            }}
            onClick={() => {
               onItemClick && onItemClick(id)
            }}
         >
            {
               !read && <Box
                  position="absolute"
                  top={2}
                  left={2}
                  width={6}
                  height={6}
                  borderRadius={2}
                  bgcolor="warning.main"
               ></Box>
            }


            <Box>
               {icon}
            </Box>
            <Box flex={1}>
               <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                     <Typography variant="body2" fontSize={14} fontWeight={500} color={isDark ? '#eee' : "#333"}>{title}</Typography>
                  </Box>
                  <Box>
                     {
                        itemsMenu && <IconButton size="small" onClick={(e: any) => {

                           Dropdown.show(e.currentTarget, itemsMenu.map((item: any): DropdownArrayType => {
                              return {
                                 ...item,
                                 onClick: () => item.onClick && item.onClick(id)
                              }
                           }))
                        }}>
                           <MoreHorizRoundedIcon sx={{ fontSize: '20px!important' }} />
                        </IconButton>
                     }
                  </Box>
               </Stack>
               {created && <Typography fontSize={11.5} mb={.5} fontWeight={500} variant="subtitle1" >
                  {created}
               </Typography>}
               {
                  content && <Typography fontSize={13.5} fontWeight={500} variant="subtitle1" >{content.substring(0, 60)}</Typography>
               }
            </Box>
         </Stack>
      </>
   )
}

const ItemView = withStore(Item, ({ observe }: any) => [observe])

const NotificationView = () => {
   const isDark = isDarkMode()
   const items: any = Handler.findAll()
   const { onLoad, onLoadMore } = Handler.setting()
   const isLoading = Handler.isLoading()

   useEffect(() => {
      if (!items.length) {
         onLoad && onLoad()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <Box
         width={380}
         bgcolor="background.paper"
         borderRadius={3}
         boxShadow={20}
         pb={1}
         overflow="hidden"
      >
         <Stack bgcolor='background.default' boxShadow={1} direction="row" justifyContent="center" alignItems="center">
            <Box flex={1}>
               <Typography sx={{ p: 2 }} variant="h6"  >Notifications</Typography>
            </Box>
            <Box>
               <IconButton onClick={() => Dropdown.hide()}><CloseIcon /></IconButton>
            </Box>
         </Stack>
         <Box>
            <Scrollbar

               darkMode={isDark} style={{ height: 600, padding: '0 ' }}
               onScrollEnd={() => {
                  onLoadMore && onLoadMore()
               }}
            >

               {
                  items.map((item: NotificationProps, idx: number) => <Box key={item.id} mb={.4}>
                     <ItemView  {...item} />
                     {
                        items[idx + 1] && <Divider />
                     }
                  </Box>)
               }

               {isLoading && <Loading number={3} />}

            </Scrollbar>
         </Box>
      </Box>
   )
}

export default withStore(NotificationView, () => [Handler.observeStoreData()])