import React from 'react'
import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase'

const Button = ({ children, ...props }: ButtonBaseProps) => {

   return (
      <ButtonBase
         disableRipple
         {...props}
         sx={{
            border: 1,
            borderColor: "#fff",
            color: "#fff",
            height: 35,
            p: "8px 16px",
            bgcolor: "transparent",
            fontSize: 16,
            ...(props.sx || {})
         }}
      >
         {children}
      </ButtonBase>
   )
}

export default Button