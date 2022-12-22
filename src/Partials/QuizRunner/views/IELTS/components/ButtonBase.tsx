import React from 'react'
import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase'

export interface ButtonProps extends ButtonBaseProps {
   icon?: string;
   hoverIcon?: string;
   iconPosition?: "left" | "right";
   borderPosition?: "left" | "right";
   active?: boolean;
}

const Button = ({ children, active, ...props }: ButtonProps) => {

   let sx: any = {
      color: active ? "yellow" : "#fff",
      height: 35,
      pr: 2,
      pl: 4.5,
      fontSize: 17,
      ...(props.sx || {})
   }

   return (
      <ButtonBase
         disableRipple
         {...props}
         sx={sx}
      >
         {children}
      </ButtonBase>
   )
}

export default Button