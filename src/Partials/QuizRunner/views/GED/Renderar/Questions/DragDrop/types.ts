

export interface DrapDropStoreProps extends DragDropItemProps {
   container: string | null;
}

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


export interface ImageContainerProps {
   width: number;
   height: number;
   image: string;
}


export interface QuiestionDataProps {
   formate_type: "box" | "option",
   type: "normal" | "image",
   point: number;
   qid: string;
   calculator: boolean;
   verticale_option: boolean;
   items: DragDropItemProps[];
   boxName: string;
   linkBoxes: string[];
   imageContainer: ImageContainerProps;
   explanations: {
      correct: string;
      incorrect: string;
   }
}


export interface QuestionProps {
   data: QuiestionDataProps;
}