import { useState, useMemo } from 'react'
import screenfull from 'screenfull';

export interface FullscreenProps {
   active: boolean;
   open: () => void;
   exit: () => void;
}
const Factory = new Map<string, FullscreenProps>()


export const getFullscreen = (key: string) => Factory.get(key)

export const useFullscreen = (key: string) => {
   const [is, setIs] = useState(false)

   useMemo(() => {
      const of = Factory.get(key)
      if (!of) {
         Factory.set(key, {
            active: false,
            open: () => {
               if (screenfull.isEnabled) {
                  screenfull.request(document.body)
                  document.body.style.overflow = 'hidden'
                  setIs(true)
               }
            },
            exit: () => {
               if (screenfull.isEnabled) {
                  setIs(false)
                  document.body.style.overflow = 'initial'
                  screenfull.exit()
               }
            }
         })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   useMemo(() => {
      const of = Factory.get(key)
      if (of) {
         Factory.set(key, {
            ...of,
            active: is
         })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [is])

   return Factory.get(key) as FullscreenProps
}
