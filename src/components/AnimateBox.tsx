import React, { FC, ReactChild, ReactNode } from 'react'
import { motion, MotionProps } from "framer-motion";
import { variants, AnimationType } from 'fmotion-variants'
interface Props extends MotionProps {
   children: ReactChild | ReactNode;
   type?: AnimationType | "none";
}

const AnimateBox: FC<Props> = ({ children, type, ...props }) => {
   type = type || "fadeIn"
   let _variants: any = variants.zoomOver
   if (variants.hasOwnProperty(type)) {
      _variants = (variants as any)[type]
   }

   if (type === 'none') {
      _variants = {}
   }

   return (
      <motion.div
         initial="initial"
         animate="animate"
         exit="exit"
         variants={_variants}
         {...props}
      >
         {children}
      </motion.div>
   )
}

export default AnimateBox