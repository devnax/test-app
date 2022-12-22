
export interface QuiestionDataProps {
   questionContent: string;
   point: number;
   qid: string;
   formate: string;
   case_sensitive: boolean;
   correct_answer: number;
   calculator: boolean;
   correctValues: any[];
   explanations: {
      correct: string;
      incorrect: string;
   };
}

export interface QuestionProps {
   data: QuiestionDataProps;
}