import React, { useRef } from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Link from '@mui/material/Link'
import { PartialProps } from './types'
import TextField from '@src/libs/Form/TextField'
import Auth from '@src/System/Auth'
import { useRouter } from 'next/router'
import { AuthRouter } from '@src/Routers'
import Encript from '@src/helpers/Encript'


const OTPForm = (props: PartialProps) => {
   const router = useRouter()
   const { form } = props
   const formData = form.getData()
   const formState = form.getState()
   const refc1: any = useRef()
   const refc2: any = useRef()
   const refc3: any = useRef()
   const refc4: any = useRef()


   const varifyCode = () => {
      const ot = form.getData().otp_given || {}
      form.setState({ invalidOTP: false })
      if (ot?.c1 && ot?.c2 && ot?.c3 && ot?.c4) {
         const gcode = ot.c1 + ot.c2 + ot.c3 + ot.c4
         if (formData?.otp_response?.code === gcode) {
            Auth.login({
               token: formData.otp_response.token,
               rest: formData.otp_response.rest,
               auth: formData.otp_response.auth
            })
            form.setState({ loading: true })
            router.push(router.query.redirect as any || '/')
         } else {
            form.setState({ invalidOTP: true })
         }
      }
   }


   return (
      <Stack>
         <Typography variant="h6">Confirm Your OTP</Typography>
         <Typography variant="subtitle1">
            4 digit code has been to {formData.username}
         </Typography>

         <Stack direction="row" spacing={2} mt={3}>
            <TextField
               disabled={formState.loading}
               error={formState.invalidOTP}
               name="otp_given"
               form={form}
               inputRef={refc1}
               inputProps={{ sx: { textAlign: "center", fontSize: 25, fontWeight: 600, p: 1 } }}
               value={formData.otp_given?.c1 || ""}
               onChange={(e) => {
                  const val = e.target.value
                  if (val.length === 1 && !isNaN(parseInt(val))) {
                     form.set("otp_given", {
                        ...formData.otp_given,
                        c1: val
                     })
                     refc2.current.focus()
                     varifyCode()
                  } else if (val.length === 4 && !isNaN(parseInt(val))) {
                     const vals = val.split("")
                     form.set("otp_given", {
                        c1: vals[0],
                        c2: vals[1],
                        c3: vals[2],
                        c4: vals[3],
                     })
                     varifyCode()
                  } else if (!val.length) {
                     form.setState({ invalidOTP: false })
                     form.set("otp_given", {
                        ...formData.otp_given,
                        c1: val
                     })
                  }
               }}
               onFocus={(e) => {
                  e.target.select()
               }}
            />
            <TextField
               disabled={formState.loading}
               error={formState.invalidOTP}
               name="otp_given"
               form={form}
               inputRef={refc2}
               inputProps={{ sx: { textAlign: "center", fontSize: 25, fontWeight: 600, p: 1 } }}
               value={formData.otp_given?.c2 || ""}
               onChange={(e) => {
                  const val = e.target.value
                  if (val.length === 1 && !isNaN(parseInt(val))) {
                     form.set("otp_given", {
                        ...formData.otp_given,
                        c2: val
                     })
                     refc3.current.focus()
                     varifyCode()
                  } else if (!val.length) {
                     form.setState({ invalidOTP: false })
                     form.set("otp_given", {
                        ...formData.otp_given,
                        c2: val
                     })
                  }
               }}
               onFocus={(e) => {
                  e.target.select()
               }}
            />
            <TextField
               disabled={formState.loading}
               error={formState.invalidOTP}
               name="otp_given"
               form={form}
               inputRef={refc3}
               inputProps={{ sx: { textAlign: "center", fontSize: 25, fontWeight: 600, p: 1 } }}
               value={formData.otp_given?.c3 || ""}
               onChange={(e) => {
                  const val = e.target.value
                  if (val.length === 1 && !isNaN(parseInt(val))) {
                     form.set("otp_given", {
                        ...formData.otp_given,
                        c3: val
                     })
                     refc4.current.focus()
                     varifyCode()
                  } else if (!val.length) {
                     form.setState({ invalidOTP: false })
                     form.set("otp_given", {
                        ...formData.otp_given,
                        c3: val
                     })
                  }
               }}
               onFocus={(e) => {
                  e.target.select()
               }}
            />
            <TextField
               disabled={formState.loading}
               error={formState.invalidOTP}
               name="otp_given"
               form={form}
               inputRef={refc4}
               inputProps={{ sx: { textAlign: "center", fontSize: 25, fontWeight: 600, p: 1 } }}
               value={formData.otp_given?.c4 || ""}
               onChange={(e) => {
                  const val = e.target.value
                  if (val.length === 1 && !isNaN(parseInt(val))) {
                     form.set("otp_given", {
                        ...formData.otp_given,
                        c4: val
                     })
                     varifyCode()
                  } else if (!val.length) {
                     form.setState({ invalidOTP: false })
                     form.set("otp_given", {
                        ...formData.otp_given,
                        c4: val
                     })
                  }
               }}
               onFocus={(e) => {
                  e.target.select()
               }}
            />
         </Stack>
         <Stack direction="row" justifyContent="flex-end" mt={2}>
            {
               formState.loading ? <CircularProgress size={14} /> : <Link sx={{ cursor: "pointer", userSelect: "none" }} onClick={async () => {
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
                     } catch (err) { }
                  } else {

                  }
               }}>Resend code</Link>
            }

         </Stack>
      </Stack>
   )
}

export default OTPForm