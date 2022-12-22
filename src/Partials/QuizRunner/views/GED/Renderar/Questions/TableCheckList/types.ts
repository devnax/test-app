
export interface HeadingProps {
   label: string;
   isMath: boolean;
}

export interface QuiestionDataProps {
   uid: string;
   questionContent: string;
   headings: HeadingProps[];
}


export interface QuestionProps {
   data: QuiestionDataProps;
   childs: any[];
}