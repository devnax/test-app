
export interface QuizItemProps {
   data: { [key: string]: any };
   type: string;
   childs: QuizItemProps[]
}

export interface QuizProps {
   quiz: {
      settings: QuizSettingsProps;
      data: QuizItemProps[]
   },
   total_questions: number;
}

export interface AdvanchPointItemProps {
   from: number;
   to: number;
   grade: number;
}

export interface MergeQuizesProps {
   id: number;
   title: string;
}


export interface QuizLIsteningProps {
   source: string;
   playFrom: number;
   palyTo: number;
}


export interface AdvanchPointItemProps {
   from: number;
   to: number;
   grade: number;
}

export interface MergeQuizesProps {
   id: number;
   title: string;
}


export interface QuizSettingsProps {
   passing_score?: number;
   timeLimit: {
      h: number;
      m: number
   },
   resticted_limit: number;
   isReadyMock: boolean;
   template: string;
   course_type: "none" | "GED" | "IELTS" | "SAT" | "GRE" | "GMAT" | "TOEFL";
   quiz_type: string;
   information: string;
   finish_button: {
      show: boolean;
      text: string;
   };


   // report
   result_message: string;
   expire_days: number;

   advanch_points: AdvanchPointItemProps[]
   merge_quizes: MergeQuizesProps[];
   listenings: QuizLIsteningProps[];
}

export interface QuizLIsteningProps {
   source: string;
   playFrom: number;
   palyTo: number;
}





export interface QuizDataProps {
   data: { [key: string]: any };
   type: string;
   childs: QuizDataProps[]
}