import React, { FC, HTMLAttributes, ReactElement, useEffect, useMemo, useState } from 'react'
import { STATE } from '../core'
import { refreshBuilder } from './Wrapper'

type Attrs = HTMLAttributes<HTMLDivElement>
type Elem = ReactElement<Attrs>
export interface DroppableProps extends Attrs {
   id: string;
   children: Elem | Elem[];
}

const Droppable: FC<DroppableProps> = ({ id, children, ...props }) => {
   const [observe, setObserve] = useState(0)

   const needDispatch = useMemo(() => {
      const wrapper = STATE.wrappers[STATE.currentWrapper]
      return !wrapper.droppables[id]
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   useEffect(() => {
      const wrapperId = STATE.currentWrapper
      const wrapper = STATE.wrappers[wrapperId]
      wrapper.droppables = {
         ...(wrapper?.droppables || {}), [id]: {
            observe: () => setObserve(Math.random())
         }
      }
      if (needDispatch) {
         refreshBuilder(wrapperId)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div {...props} data-drop={id} key={observe} >
         {children}
      </div>
   )
}

export default Droppable