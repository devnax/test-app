import React from 'react'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import MuiLink from '@mui/material/Link'
import TextField from '@src/libs/Form/TextField'
import { TermRouter } from '@src/Routers'
import timerAction from 'timer-action'
import { InputAdornment } from '@mui/material'
import ErrorIcon from '@mui/icons-material/CloseRounded';
import SuccessIcon from '@mui/icons-material/CheckRounded';
import * as piece from 'json-piece'
import { PromocodeProps } from './types'
import System from '@src/System'


const Promocode = ({ form }: PromocodeProps) => {
   const formState = form.getState()
   return (
      <Stack mb={1} mt={1}>
         <TextField
            autoFocus
            disabled={formState.promocodeChecking}
            form={form}
            name="promocode"
            placeholder='Enter the promocode'
            error={formState.promocodeError}
            helperText={formState.promocodeError && "Invalid Promocode"}
            onChange={(e: any) => {
               form.set("promocode", e.target.value)
               form.setState({ promocodeError: false })
               if (e.target.value) {
                  timerAction("checking_promocode", async () => {
                     form.setState({ promocodeData: null, promocodeChecking: true })
                     const codes = await TermRouter.find({ type: "promocode", name: e.target.value })
                     if (codes?.length) {
                        const code = codes[0]
                        const content: any = piece.parse(code.content as any) as any
                        if (content?.discount) {
                           content.discount = parseFloat(content.discount)
                        }
                        form.setState({
                           promocodeData: {
                              code: code.name,
                              discount: System.formatePrice(content.discount)
                           },
                           promocodeChecking: false
                        })
                     } else {
                        form.setState({ promocodeError: true, promocodeChecking: false })
                     }
                  })
               }
            }}

            InputProps={{
               endAdornment: <InputAdornment position='end'>
                  {
                     formState.promocodeChecking && <CircularProgress size={20} />
                  }
                  {
                     formState.promocodeData && <SuccessIcon sx={{ color: "primary.main" }} />
                  }
                  {
                     formState.promocodeError && <ErrorIcon sx={{ color: "error.main" }} />
                  }
               </InputAdornment>
            }}
         />
         <Stack direction="row" justifyContent="flex-end">
            <MuiLink
               pl={1}
               color="inherit"
               sx={{ cursor: "pointer", display: "inline-block" }}
               onClick={() => {
                  form.setState({ activePromocode: false })
               }}
            >
               cancel
            </MuiLink>
         </Stack>
      </Stack>
   )
}

export default Promocode