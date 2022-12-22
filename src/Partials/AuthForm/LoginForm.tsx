import React from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@src/libs/Form/TextField'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { AuthRouter } from '@src/Routers'
import { PartialProps } from './types'
import Encript from '@src/helpers/Encript'


const LoginForm = (props: PartialProps) => {

   const { form } = props

   const formData = form.getData()
   const formState = form.getState()


   return (
      <Stack
         spacing={3}
      >
         <Typography variant="h6" >Continue with Phone/Email</Typography>
         <Stack spacing={2} >
            <TextField
               disabled={formState.loading}
               name="username"
               form={form}
               inputProps={{
                  sx: { p: 1.5, fontSize: 18 }
               }}
               size="small"
               placeholder='Phone or Email'
            />
         </Stack>

         <LoadingButton loading={formState.loading} variant="contained" onClick={async () => {
            form.setState({ loading: true })
            const login: any = await AuthRouter.get('/otp-login', {
               params: {
                  username: formData.username
               }
            })

            form.setState({ loading: false })
            if (login?.data.data) {
               try {
                  const parse = Encript.decript(login.data.data.info)
                  form.set("otp_response", parse)
                  form.set("step", 'OTP')
               } catch (err) { }
            } else {
               form.set("step", 'USER_INFO')
            }
         }}>
            Submit
         </LoadingButton>
      </Stack>
   )
}

export default LoginForm