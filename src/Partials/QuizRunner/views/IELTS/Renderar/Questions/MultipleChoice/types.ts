
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
   inline: boolean;
   maxChecked: number;
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
   data: QuiestionDataProps;
}