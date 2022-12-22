import React, { useEffect, useMemo } from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import TextField from '@src/libs/Form/TextField'
import Select from '@src/libs/Form/Select'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { AuthRouter } from '@src/Routers'
import { PartialProps } from './types'
import Encript from '@src/helpers/Encript'
import countryList from './country-list'
import System from '@src/System'

const LoginForm = (props: PartialProps) => {

   const { form } = props

   const formData = form.getData()
   const formState = form.getState()
   useEffect(() => {
      const countryInfo = System.getUserCountry()
      const find = countryList.find(c => c.code === countryInfo.code)
      if (find) {
         form.set("country", find.code)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const countries = useMemo(() => countryList.map(country => ({ label: country.label, value: country.code })), [])

   return (
      <Stack
         spacing={3}
      >
         <Typography variant="h6" >Continue with Phone/Email</Typography>
         <Stack spacing={2}>
            <Box>
               <TextField
                  label="Name"
                  disabled={formState.loading}
                  name="name"
                  form={form}
                  size="small"
               />
            </Box>
            <Box>
               <Select
                  name="country"
                  form={form}
                  label="Country"
                  options={countries}
                  disableClearable
                  sx={{ minWidth: 120 }}
                  renderOption={(props, option: any) => (
                     <Stack component="li" direction="row" spacing={1} {...props}>
                        <picture>
                           <img
                              loading="lazy"
                              width="20"
                              src={`https://flagcdn.com/w20/${option.value.toLowerCase()}.png`}
                              srcSet={`https://flagcdn.com/w40/${option.value.toLowerCase()}.png 2x`}
                              alt=""
                           />
                        </picture>
                        +{option.label}
                     </Stack>
                  )}
               />
            </Box>

         </Stack>

         <LoadingButton loading={formState.loading} variant="contained" onClick={async () => {
            form.setState({ loading: true })
            const country = countryList.find(c => c.code === formData.country)
            const register: any = await AuthRouter.get('/otp-register', {
               params: {
                  username: formData.username,
                  name: formData.name,
                  country: {
                     name: country?.label,
                     phone: country?.phone,
                     code: formData.country,
                  },
               }
            })
            form.setState({ loading: false })
            if (register?.data.data) {

               try {
                  const parse = Encript.decript(register.data.data.info)

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