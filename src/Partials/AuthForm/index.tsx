import React from 'react'
import Stack from '@mui/material/Stack'
import { useForm } from '@src/libs/Form/useForm'
import OTPForm from './OTPForm'
import { FormData } from './types'
import LoginForm from './LoginForm'
import UserInfoForm from './UserInfoForm'

const AuthForm = () => {
   const form = useForm<FormData>()
   const formData = form.getData()

   let tmp = <LoginForm form={form} />
   switch (formData.step) {
      case "USER_INFO":
         tmp = <UserInfoForm form={form} />
         break;
      case "OTP":
         tmp = <OTPForm form={form} />
         break;
   }

   return (
      <Stack
         p={3}
         borderRadius={2}
         width={450}
         spacing={3}
      >
         {
            tmp
         }
      </Stack>
   )
}

export default AuthForm