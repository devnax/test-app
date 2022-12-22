import BuilderWrapper from './views/BuilderWrapper'
import Droppable from './views/Droppable'
import Builder from './handlers/Builder'
import { DroppableProps } from './types'
export * from './types'

interface BuilderState {
   currentWrapper: string | null;
   wrappers: {
      [wrapperId: string]: {
         handler: Builder,
         droppables: {
            [key: string]: DroppableProps
         }
      }
   }
}

export const BUILDER_STATE: BuilderState = {
   currentWrapper: null,
   wrappers: {}
}

export { Builder, BuilderWrapper, Droppable }