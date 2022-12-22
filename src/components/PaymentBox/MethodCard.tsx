import React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Radio from '@mui/material/Radio'
import { alpha } from '@mui/material/styles'
import { PaymentMethodCardProps } from './types'

const PaymentMethodCard = ({ form, title, icon }: PaymentMethodCardProps) => {
   const formData = form.getData()
   const isActive = formData.method === title

   return <Stack
      borderRadius={2}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      p={1}
      border={1}
      borderColor={(theme) => isActive ? alpha(theme.palette.primary.main, .9) : "transparent"}
      bgcolor={(theme) => isActive ? alpha(theme.palette.primary.main, .1) : alpha(theme.palette.background.default, 1)}
      sx={{
         transition: "all .3s",
         cursor: "pointer",
         '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, .1)
         }
      }}
      onClick={() => {
         form.set("method", title as any)
      }}
   >
      <Stack direction="row" alignItems="center" spacing={1}>
         <Radio checked={isActive} />
         <Typography variant="h6" color="#333">{title}</Typography>
      </Stack>
      <Stack>
         <picture>
            <img alt={title} src={icon} height={30} />
         </picture>
      </Stack>
   </Stack>
}


export default PaymentMethodCard