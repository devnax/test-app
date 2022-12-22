import React from 'react'
import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase'

const Button = ({ children, ...props }: ButtonBaseProps) => {

   return (
      <ButtonBase
         disableRipple
         {...props}
         sx={{
            color: "#333",
            p: "4.2px 14px",
            bgcolor: "#6aade4",
            borderRadius: "6px",
            fontSize: 14,
            ...(props.sx || {})
         }}
      >
         {children}
      </ButtonBase>
   )
}

export default Button