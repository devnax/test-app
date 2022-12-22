import React from 'react'
import { QuestionProps } from '../types'
import Stack from '@mui/material/Stack'
import RenderBox from './RenderBox'

const ImageBox = (props: QuestionProps) => {
   const { imageContainer, items } = props.data
   return (
      <Stack
         width={imageContainer.width || "auto"}
         height={imageContainer.height || "auto"}
         position="relative"
         sx={{
            backgroundImage: `url(${imageContainer.image})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat"
         }}
      >
         {
            items.map((item, idx) => <Stack
               key={idx}
               position="absolute"
               top={item.top}
               left={item.left}
               width={item.width}
               height={item.height}
            >
               <RenderBox option={item} {...props} />
            </Stack>)
         }
      </Stack>
   )
}

export default ImageBox