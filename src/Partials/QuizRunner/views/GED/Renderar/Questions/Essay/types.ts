
export interface QuiestionDataProps {
   title: string;
   questionContent: string;
   point: number;
   qid: string;
   calculator: boolean;
   count_word: boolean;
   limit_word: number;
   conent_controll: boolean; // cut copy
}


export interface QuestionProps {
   data: QuiestionDataProps;
}