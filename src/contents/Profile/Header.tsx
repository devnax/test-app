import React, { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Contaner from '@mui/material/Container'
import { Avatar, Typography, Button } from '@mui/material'
import Modal from '@src/libs/Modal'
import ProfileEdit from './ProfileEdit'
import Auth from '@src/System/Auth'
import moment from 'moment'

const Header = () => {
   const [auth, setAuth] = useState<any>({})

   useEffect(() => {
      (async () => {
         setAuth(Auth.getAuth() || {})
      })();
   }, [])

   return (
      <Stack
         bgcolor="background.paper"
      >
         <Contaner sx={{ py: 5 }}>
            <Stack
               direction={{
                  xs: "column",
                  md: "row"
               }}
               alignItems="center"
               spacing={4}
            >
               <Avatar
                  src={auth?.photo}
                  sx={{
                     width: 100,
                     height: 100
                  }}
               />
               <Stack >
                  <Typography variant="h4" >{auth.firstname}</Typography>
                  <Typography variant="subtitle1" fontSize={14.5}>Joined: {moment(auth.created_at).format("MMM Do YY")}</Typography>

                  <div>
                     <Button
                        variant="text"
                        color="primary"
                        sx={{ py: 0 }}
                        onClick={() => {
                           Modal.open("edit_profile", <ProfileEdit />, {
                              closeButton: false
                           })
                        }}>
                        Edit Account
                     </Button>
                  </div>
               </Stack>
            </Stack>
         </Contaner>
      </Stack>
   )
}

export default Header