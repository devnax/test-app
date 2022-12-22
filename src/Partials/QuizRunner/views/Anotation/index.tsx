import React, { useState, useEffect, useRef } from 'react'
import Box, { BoxProps } from '@mui/material/Box'
export * from './service'
import { AnotationFactory, AnotionFactoryProps } from './service'
import { withMemo } from 'state-range'

type AnotationProps = BoxProps & {
   id: string;
   content: string;
}

const Anotation = ({ id, content, ...props }: AnotationProps) => {
   const [d, dispatch] = useState(0)
   const ref: any = useRef()

   useEffect(() => {
      const fac = AnotationFactory.get(id)
      if (!fac) {
         AnotationFactory.set(id, {
            content,
            dispatch: () => dispatch(Math.random()),
            spans: []
         })
      } else {
         const spans = ref.current.querySelectorAll(`[data-anotation="${id}"] [data-mark]`) || []
         AnotationFactory.set(id, {
            ...fac,
            dispatch: () => dispatch(Math.random()),
            spans: Array.from(spans)
         })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   useEffect(() => {
      if (ref.current) {
         const fac = AnotationFactory.get(id) as AnotionFactoryProps
         ref.current.innerHTML = decodeURIComponent(fac?.content || content)
         const spans = ref.current.querySelectorAll(`[data-anotation="${id}"] [data-mark]`) || []
         AnotationFactory.set(id, {
            ...fac,
            dispatch: () => dispatch(Math.random()),
            spans: Array.from(spans)
         })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [d])

   return (
      <Box
         {...props}
         ref={ref}
         sx={{
            userSelect: "text",
            cursor: "text"
         }}
         data-anotation={id}
      >
      </Box>
   )
}

export default withMemo(Anotation, ({ id }) => {
   const fac = AnotationFactory.get(id)
   return [fac?.content]
})