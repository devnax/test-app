import { useId } from 'react'
import deleayTimer from 'timer-action'

export interface FactoryType {
   data: any[];
   index: number;
   action: boolean;
}

export interface UseUndoReturnType {
   add: (val: any) => void;
   undo: () => undefined | any;
   redo: () => undefined | any;
   clear: () => void;
}


const factory = new Map<string, FactoryType>()

const useUndo = () => {
   const id = useId()

   return {
      add: (value: any) => {
         deleayTimer(id, () => {
            let gt = factory.get(id)
            if (!gt) {
               gt = {
                  data: [],
                  index: 0,
                  action: false
               }
            }
            if (!gt.action) {
               gt.index = gt.data.length - 1
            } else {
               gt.action = false
            }
            gt.data = [...gt.data, value]
            factory.set(id, gt)
         }, 400)
      },
      undo: () => {
         let gt = factory.get(id)
         if (gt) {
            const index = gt.index - 1
            const v = gt.data[index] || undefined
            factory.set(id, {
               ...gt,
               index,
               action: true
            })
            return v
         }
      },
      redo: () => {
         let gt = factory.get(id)
         if (gt) {
            const index = gt.index + 1
            const v = gt.data[index] || undefined
            factory.set(id, {
               ...gt,
               index,
               action: true
            })
            return v
         }
      },
      clear: () => {
         factory.set(id, {
            data: [],
            index: 0,
            action: false
         })
      }
   }
}
export default useUndo