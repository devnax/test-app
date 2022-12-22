import React, { HTMLAttributes, ReactNode, UIEvent } from 'react'
import Scrollbar from 'react-browser-scrollbar'

interface Props extends HTMLAttributes<HTMLDivElement> {
   children: ReactNode;
   darkMode?: boolean;
   autoHide?: boolean;
   thumbSize?: number;
   onScrollEnd?: (e: UIEvent<HTMLDivElement>) => void;
   onScrollStop?: (e: UIEvent<HTMLDivElement>) => void;
   onScrollStart?: (e: UIEvent<HTMLDivElement>) => void;
}


const _Scrollbar = ({ children, ...rest }: Props) => {
   return (
      <Scrollbar {...rest}>
         {children}
      </Scrollbar>

   )
}

export default _Scrollbar