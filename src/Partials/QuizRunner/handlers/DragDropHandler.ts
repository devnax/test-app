import { Store } from "state-range";

export interface CorrectOption {
   optionsId: string;
   optionLabel: string;
}

export interface DragDropItemProps {
   id: string;
   width: number;
   height: number;
   radius: number;
   bgimage: string;
   bgcolor: string;
   borderWidth: string;
   borderColor: string;
   label: string;
   correctOption: CorrectOption; // option index
   vertical: boolean;
   boxAcceptMultiple: boolean;

   // image type props
   top: number;
   left: number;
}

export interface DrapDropStoreProps extends DragDropItemProps {
   container: string | null;
}

class DragDropHandler extends Store<DrapDropStoreProps>{
   create(item: DragDropItemProps) {
      if (!this.findFirst({ id: item.id })) {
         this.insert({
            ...item,
            container: null
         })
      }
   }
}

export default new DragDropHandler