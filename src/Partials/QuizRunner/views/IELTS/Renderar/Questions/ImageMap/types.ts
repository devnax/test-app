
export interface QuestionFields {
   left: number;
   top: number;
}


export interface QuiestionDataProps {
   uid: string;
   questionContent: string;
   width: number;
   height: number;
   image_url: string;
   fields: {
      [key: string]: QuestionFields
   };
}




export interface QuestionProps {
   data: QuiestionDataProps;
   childs: any[]
}