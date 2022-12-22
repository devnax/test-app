import React, { FC, ReactElement, Suspense, useMemo } from 'react'
import Handler from '../handlers/Builder'
import { Wrapper, WrapperProps } from '../draghost'
import { BUILDER_STATE } from '../index'

export interface BulderWrapperProps extends Partial<WrapperProps> {
   children: ReactElement<any> | ReactElement<any>[];
   id: string;
   handler: Handler
}

const BulderWrapper: FC<BulderWrapperProps> = ({ handler, id, children, onDrop, ...props }) => {
   useMemo(() => {
      BUILDER_STATE.currentWrapper = id
      BUILDER_STATE.wrappers[id] = {
         handler,
         droppables: {}
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])


   return (
      <Suspense fallback={"loading..."}>
         <Wrapper
            {...props}
            id={id}
            moves={(el, container, handle, sibling) => {
               if (el?.id === 'empty_dropable') {
                  return false
               }
               const wrapper = BUILDER_STATE.wrappers[id]
               const dropId = container?.getAttribute('data-drop') || ""
               const options = wrapper.droppables[dropId]
               if (options?.disabled) {
                  return false
               }

               const _handler = el?.querySelector('[data-handler]')
               if (_handler) {
                  return handle?.hasAttribute('data-handler') || false
               }
               return props.moves ? props.moves(el, container, handle, sibling) : true
            }}
            accepts={(el, target, source, sibling) => {
               const wrapper = BUILDER_STATE.wrappers[id]
               const targetDropId = target?.getAttribute('data-drop') || ""
               const sourceDropId = source?.getAttribute('data-drop') || ""
               const targetOptions = wrapper.droppables[targetDropId]
               const sourceOptions = wrapper.droppables[sourceDropId]

               if (targetOptions?.disabled) {
                  return false
               }

               if (sourceOptions && sourceOptions?.selfOnly) {
                  if (targetDropId !== sourceDropId) {
                     return false
                  }
               }

               if (targetOptions && targetOptions.accepts) {
                  const item = handler.getItem(el?.id as any)
                  if (item && targetOptions.accepts.includes(item.widgetId)) {
                     return true
                  }
                  return false
               }
               return props.accepts ? props.accepts(el, target, source, sibling) : true
            }}

            copy={(el, source) => {
               const wrapper = BUILDER_STATE.wrappers[id]
               const dropId = source?.getAttribute('data-drop') || ""
               const options = wrapper.droppables[dropId]
               if (options && options.copy !== undefined) {
                  return options.copy
               }
               if (props.copy) {
                  if (typeof props.copy === 'function') {
                     return props.copy(el, source)
                  }
                  return props.copy
               }
               return false
            }}

            onDrop={({ el, toIndex, targetId, source, ...rest }) => {

               let itemId = (el as any).id

               const wrapper = BUILDER_STATE.wrappers[id]
               const dropId = source?.getAttribute('data-drop') || ""
               const options = wrapper.droppables[dropId]
               if (options && options.copy === true) {
                  const item = handler.getItem(itemId)
                  if (item) {
                     const created = handler.create({
                        widgetId: item?.widgetId,
                        containerId: targetId
                     })
                     itemId = created._id
                  }
               } else {
                  handler.update({ containerId: targetId }, { _id: itemId })
               }

               const destItems = handler.getContainerItems(targetId)
               if (destItems.length) {
                  const item = destItems[toIndex]
                  if (item) {
                     const oldIndex = handler.getIndex(itemId)
                     const newIndex = handler.getIndex(item._id)
                     handler.move(oldIndex as number, newIndex as number)
                  }
               }
               if (onDrop) {
                  onDrop({ el, toIndex, targetId, source, ...rest })
               }
            }}
         >
            {children}
         </Wrapper>
      </Suspense>
   )
}

export default BulderWrapper