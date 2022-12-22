
export interface HeadingProps {
   label: string;
   isMath: boolean;
}

export interface QuiestionDataProps {
   qid: string;
   questionContent: string;
   headings: HeadingProps[];
}


export interface QuestionProps {
   data: QuiestionDataProps;
   childs: any[];
}