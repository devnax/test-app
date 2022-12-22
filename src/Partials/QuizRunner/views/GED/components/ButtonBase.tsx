import React from 'react'
import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase'

export interface ButtonProps extends ButtonBaseProps {
   icon?: string;
   hoverIcon?: string;
   iconPosition?: "left" | "right";
   borderPosition?: "left" | "right";
   active?: boolean;
}

const Button = ({ icon, hoverIcon, iconPosition, borderPosition, children, active, ...props }: ButtonProps) => {

   let sx: any = {
      color: active ? "yellow" : "#fff",
      height: 35,
      pr: 2,
      pl: 4.5,
      fontSize: 17,
      ...(props.sx || {})
   }

   if (borderPosition) {
      if (borderPosition === "left") {
         sx.borderLeft = "2px solid #fff"
      } else {
         sx.borderRight = "2px solid #fff"
      }
   }

   if (icon) {
      sx = {
         backgroundImage: `url(${icon})`,
         backgroundRepeat: "no-repeat",
         backgroundSize: "contained",
         backgroundPosition: iconPosition === 'right' ? "95%" : "5%",
         ...sx,
      }
      if (hoverIcon) {
         sx = {
            ...sx,
            '&:hover': {
               backgroundImage: `url(${hoverIcon})`,
               color: 'yellow'
            },
         }
      }

      if (active) {
         sx = {
            backgroundImage: `url(${hoverIcon})`,
            color: 'yellow',
            ...sx,
         }
      }
   }

   if (iconPosition === 'right') {
      sx.pr = 4.5
      sx.pl = 2
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