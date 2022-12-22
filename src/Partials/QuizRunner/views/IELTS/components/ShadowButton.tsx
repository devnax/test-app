import React from 'react'
import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase'

const ShadowButton = ({ children, ...props }: ButtonBaseProps) => {

   return (
      <ButtonBase
         disableRipple
         {...props}
         sx={{
            color: "#1e415b",
            boxShadow: "0 1px 1px rgb(0 0 0 / 50%)",
            p: "6px 16px",
            bgcolor: "transparent",
            borderRadius: "5px",
            fontSize: 15,
            fontWeight: 700,
            "&:hover": {
               boxShadow: "0 1px 2px rgb(0 0 0 / 75%)"
            },
            ...(props.sx || {})
         }}
      >
         {children}
      </ButtonBase>
   )
}

export default ShadowButton