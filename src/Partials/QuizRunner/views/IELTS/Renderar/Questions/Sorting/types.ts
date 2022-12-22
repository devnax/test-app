
export interface QuestionOptions {
   label: string;
   type: "text" | "image";
   isMath: boolean;
}

export interface QuestionDataProps {
   questionContent: string;
   options: QuestionOptions[];
   point: number;
   qid: string;
   calculator: boolean;
   optionPrefix: "NONE" | "LETTER_UPPER" | "LETTER_LOWER" | "NUMBER" | "ROMAN_UPPER" | "ROMAN_LOWER";
   prefixSeparator: string;
   randomSorting: boolean;
   collapsible: boolean;
   explanations: {
      correct: string;
      incorrect: string;
   }
}



export interface QuestionProps {
   data: QuestionDataProps;
}