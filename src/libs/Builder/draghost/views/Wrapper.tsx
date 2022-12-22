import React, { FC, ReactElement, useEffect, useMemo, useRef } from 'react'
import { DragulaOptions, Drake } from 'dragula'
import { DroppableProps } from './Droppable'
import { STATE } from '../core'
import '../style'
type Elem = ReactElement<DroppableProps>

export interface DropProps {
   el: Element | null;
   target: Element | null;
   source: Element | null;
   sibling: Element | null;

   sourceId: string;
   targetId: string;
   fromIndex: number;
   toIndex: number;
}

export interface WrapperProps {
   children: Elem | Elem[];
   id: string;
   onDrop: (props: DropProps) => void;
   onDrag?: (el: Element, source: Element) => void;
   onDragend?: (el: Element) => void;
   onCalcel?: (el: Element, source: Element, container: Element) => void;
   onRemove?: (el: Element, source: Element, container: Element) => void;
   onShadow?: (el: Element, source: Element, container: Element) => void;
   onOver?: (el: Element, source: Element, container: Element) => void;
   onOut?: (el: Element, source: Element, container: Element) => void;
   onCloned?: (clone: Element, original: Element, type: 'copy' | 'mirror') => void;

   moves?: DragulaOptions['moves'];
   accepts?: DragulaOptions['accepts'];
   copy?: DragulaOptions['copy'];
   invalid?: DragulaOptions['invalid'];
   isContainer?: DragulaOptions['isContainer'];

   direction?: 'vertical' | 'horizontal',
   copySortSource?: boolean,
   revertOnSpill?: boolean,
   removeOnSpill?: boolean,
   mirrorContainer?: HTMLElement,
   ignoreInputTextSelection?: boolean,
   slideFactorX?: number,
   slideFactorY?: number,
}
let dragula: any;
let inst: Drake;



if (typeof Node === 'function' && Node.prototype) {
   const originalRemoveChild = Node.prototype.removeChild;

   (Node as any).prototype.removeChild = function (child: Element) {
      if (child.parentNode !== this) {
         return child;
      }
      const args: any = arguments
      return originalRemoveChild.apply(this, args);
   };

   const originalInsertBefore = Node.prototype.insertBefore;
   (Node as any).prototype.insertBefore = function (newNode: Element, referenceNode: Element) {
      if (referenceNode && referenceNode.parentNode !== this) {
         return newNode;
      }
      const args: any = arguments
      return originalInsertBefore.apply(this, args);
   };
}

export const refreshBuilder = (wrapperId: string) => {
   const wrapper = STATE.wrappers[wrapperId]
   if (wrapper) {
      if (!dragula) {
         import('react-dragula').then((mod) => {
            dragula = mod.default
            instanceBuilder(wrapperId)
         })
      } else {
         instanceBuilder(wrapperId)
      }
   }
}

const instanceBuilder = (wrapperId: string) => {
   const wrapper = STATE.wrappers[wrapperId]
   const wrapperEle = wrapper.ele
   if (!wrapperEle) return;
   const containers: any = wrapperEle.querySelectorAll('[data-drop]')
   if (inst) {
      inst.destroy()
   }
   const {
      children,
      id,
      onDrop,
      onDrag,
      onDragend,
      onCalcel,
      onRemove,
      onShadow,
      onOver,
      onOut,
      onCloned,
      ...settings
   } = wrapper.props


   inst = dragula(Array.from(containers), settings)
   let fromIndex: any = null


   if (onDragend) inst.on("dragend", onDragend)
   if (onCalcel) inst.on("cancel", onCalcel)
   if (onRemove) inst.on("remove", onRemove)
   if (onShadow) inst.on("shadow", onShadow)
   if (onOver) inst.on("over", onOver)
   if (onOut) inst.on("out", onOut)
   if (onCloned) inst.on("cloned", onCloned)

   inst.on('drag', (el: any, source) => {
      if (onDrag) onDrag(el, source)
      fromIndex = Array.from(el.parentNode.children).indexOf(el)
   })

   inst.on('drop', (el: any, target, source, sibling) => {
      if (!target) return
      const droppables = wrapper.droppables
      const sourceId: any = source.getAttribute('data-drop')
      const targetId: any = target.getAttribute('data-drop')
      let toIndex = Array.from(el.parentNode.children).indexOf(el)

      if (droppables[sourceId]) droppables[sourceId].observe()
      if (droppables[targetId]) droppables[targetId].observe()

      onDrop({ el, target, source, sibling, fromIndex, toIndex, sourceId, targetId })
      fromIndex = null

      setTimeout(() => {
         inst.destroy()
         instanceBuilder(wrapperId)
      }, 50)
   })
}

const BuilderWrapper: FC<WrapperProps> = (props) => {
   const ref = useRef<HTMLDivElement>()

   const { children, id } = props
   useMemo(() => {
      STATE.currentWrapper = id
      STATE.wrappers[id] = {
         id,
         droppables: {},
         props
      } as any
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   useEffect(() => {
      if (ref.current) {
         STATE.wrappers[id] = {
            ...STATE.wrappers[id],
            ele: ref.current,
         }
         import('react-dragula').then((mod) => {
            dragula = mod.default
            instanceBuilder(id)
         })
      }

      return () => {
         if (STATE.wrappers[id]) {
            delete STATE.wrappers[id]
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   return (
      <div ref={ref as any}>
         {children}
      </div>
   )
}

export default BuilderWrapper

