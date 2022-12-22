import { Post, PostMeta } from '@src/Routers'


interface LectureItem {
   id: number;
   title: string;
   expanded: boolean;
   type: "topic" | "quiz";
   props: {}
}

interface CourseOutline {
   id: number;
   title: string;
   type: "lesson"
   items: LectureItem[];
   props: {
      lesson_material?: boolean;
      sample_lesson?: "yes"
   }
}

export interface QuizReportProps {
   id: number;
   user_id: number;
   course_id: number;
   quiz_id: number;
   group_id: number | null;
   finished: boolean;
   reports: string;
   created_at: string;
   merge_items: QuizReportProps[];
}

export interface SinglePageCompProps {
   course: SingleCourseType;
   update: (d: Partial<SingleCourseType>) => void;
   topic?: Post & {
      thumbnail: {
         type: string;
         url: string
      };
      quiz_data?: any;
      quiz_reports?: QuizReportProps[]
   };
}

export interface CourseSettingsProps {
   [key: string]: any;
   intro_video: string;
   course_price: string;
   discount_price: string;
   expire_days: string;
   delete_expire_data: string;
   certificate: string;
   price: {
      normal: number;
      local: number
      regular_normal: number;
      regular_local: number
   },
}

export interface SingleCourseType extends Omit<Post, 'content'> {
   content: ContentData[];
   post_metas: PostMeta[];
   thumbnail: string;
   enroll_count: number;
   course_outline: CourseOutline[],
   enrolled?: {
      id: number;
      course_id: number;
      user_id: number;
      enroll_date: string;
      expire_on: string;
      progress: number;
   };
   count_lectureItems: {
      lectures: number;
      topics: number;
      quizes: number;
   },
   course_settings: CourseSettingsProps;
   completed_topics: number[];

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
   resticted: {
      limit?: number;
      user_for?: "all_user" | "login_user" | "logout_user"
   };
   require_questions: boolean;
   quiz_summery: boolean;
   pagination: boolean;
   autostart: boolean;
   template: string;
   quiz_type: string;

   // Content
   description: string;
   quiz_material: string;
   restart_button: boolean;
   question_numbering: boolean;
   finish_button: {
      show: boolean;
      text: string;
   };

   // report
   result_message: string;
   report_view: boolean;
   expire_days: number;
   email_notifications: {
      admin: boolean;
      user: boolean;
      custom_email: string
   };
   display_results: {
      explaination: boolean;
      total_points: boolean;
      show_duration: boolean;
      download_report: boolean;
      print_report: boolean;
   },

   user_info_message: string;
   advanch_points: AdvanchPointItemProps[]
   merge_quizes: MergeQuizesProps[];
   listenings: QuizLIsteningProps[];
}

export interface QuizLIsteningProps {
   source: string;
   playFrom: number;
   palyTo: number;
}


export interface BuilderMetaProps {
   loading: boolean;
   settings: QuizSettingsProps;
}


export interface ContentData {
   data: { [key: string]: any };
   type: "grid" | "textbox" | "tab" | "accordion";
   childs: ContentData[]
}