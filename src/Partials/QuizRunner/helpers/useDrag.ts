import { useState, useEffect, useRef, useMemo } from 'react'

let defState = {
   pos: {
      left: 0,
      top: 0
   },
   initX: 0,
   initY: 0,
   height: 0,
   width: 0,
   isMouseDown: false,
   withHandler: false
}

let state = { ...defState }

const useDrag = () => {
   const ref: any = useRef()
   const handerRef: any = useRef()
   const [, dispatch] = useState(0)

   useMemo(() => {
      state = { ...defState }
   }, [])

   const setState = (s: typeof state) => {
      dispatch(Math.random())
      state = {
         ...state,
         ...s
      }
   }

   const handleDown = (e: any) => {
      if (!ref.current) {
         return
      }

      setState({
         ...state,
         isMouseDown: true,
         initX: e.offsetX,
         initY: e.offsetY,
         height: ref.current.offsetHeight,
         width: ref.current.offsetWidth,
      })
   }

   const moving = (e: any) => {
      if (state.isMouseDown) {
         if (handerRef.current && !state.withHandler) {
            if (!handerRef.current.contains(e.target)) {
               setState({
                  ...state,
                  isMouseDown: false
               })
               return;
            } else {
               setState({
                  ...state,
                  withHandler: true
               })
            }
         }

         var cx = e.clientX - state.initX,
            cy = e.clientY - state.initY;
         if (cx < 0) {
            cx = 0;
         }
         if (cy < 0) {
            cy = 0;
         }
         if (window.innerWidth - e.clientX + state.initX < state.width) {
            cx = window.innerWidth - state.width;
         }
         if (e.clientY > window.innerHeight - state.height + state.initY) {
            cy = window.innerHeight - state.height;
         }
         ref.current.style.left = cx + "px";
         ref.current.style.top = cy + "px";
      }
   }

   const up = () => {
      setState({
         ...state,
         isMouseDown: false,
         withHandler: false,
         pos: {
            left: ref.current.style.left,
            top: ref.current.style.top
         }
      })
   }

   useEffect(() => {
      if (ref.current) {
         ref.current.addEventListener("mousedown", handleDown);
         ref.current.addEventListener("mouseup", up);
         document.addEventListener("mousemove", moving);
      }

      return () => {
         setState({
            ...defState
         })
         document.removeEventListener("mousemove", moving)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return [state, ref, handerRef]

}


export default useDrag