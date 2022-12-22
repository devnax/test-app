import { WrapperProps } from './views/Wrapper'

interface StateProps {
   currentWrapper: string;
   wrappers: {
      [key: string]: {
         id: string;
         ele: Element;
         props: WrapperProps;
         droppables: {
            [key: string]: {
               observe: () => void;
               [key: string]: any
            }
         },
         [key: string]: any
      }
   },
}


export const STATE: StateProps = {
   currentWrapper: '',
   wrappers: {},
}
