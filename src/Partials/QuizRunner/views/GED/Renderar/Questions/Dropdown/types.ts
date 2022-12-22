
export interface QuestionOptions {
   label: string;
   correct: boolean;
   type: "text" | "image";
   isMath: boolean;
}

export interface QuiestionDataProps {
   questionContent: string;
   options: QuestionOptions[];
   point: number;
   qid: string;
   calculator: boolean;
   randomSorting: boolean;
   explanations: {
      correct: string;
      incorrect: string;
   }
}


export interface QuestionProps {
   data: QuiestionDataProps;
}