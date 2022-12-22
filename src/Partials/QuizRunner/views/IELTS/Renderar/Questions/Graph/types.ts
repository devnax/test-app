
export interface QuestionFields {
   correct: boolean;
   left: number;
   top: number;
   width: number;
   height: number;
}


export interface QuiestionDataProps {
   questionContent: string;
   point: number;
   qid: string;
   calculator: boolean;
   max_select: number;
   width: number;
   height: number;
   image_url: string;
   fields: {
      [key: string]: QuestionFields
   };
   explanations: {
      correct: string;
      incorrect: string;
   };
}


export interface QuiestionInfoProps {
   activeItem: string; // index
}


export interface QuestionProps {
   data: QuiestionDataProps;
   childs: any[]
}