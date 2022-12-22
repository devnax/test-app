type QuizID = number
import { Post } from '@src/Routers';
import { ReportInfoProps } from './ReportGenerate';


export interface ReportFactoryProps {
   message: string;
   quiz_id: number;
   quiz: Post | null;
   reports: ReportInfoProps | null;
}

const ReportFactory = new Map<QuizID, ReportFactoryProps>()


export default ReportFactory