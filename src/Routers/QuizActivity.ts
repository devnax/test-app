import { BaseRouter, BaseRouterArgs } from '@src/Routers'
import * as piece from 'json-piece'

interface Args extends BaseRouterArgs {
   data: {
      quiz_id: number;
      course_id: number;
      user_id: number;
      finished: boolean;
      reports: string;
   };
   where: {};
   model: {
      quiz_id: number;
      course_id: number;
      user_id: number;
      finished: boolean;
      reports: string;
   }
}

class QuizActivityRouter extends BaseRouter<Args> {
   basePath: string = `/quiz-activities`


   async init(course_id: number, quiz_id: number) {
      const res: any = await this.post('/init', {
         data: {
            course_id,
            quiz_id
         }
      })
      return res.data.data
   }

   async finish(props: { group_id: number, quiz_id: number, reports: object, course_id: number }) {
      props.reports = piece.toString(props.reports) as any
      const res: any = await this.put('/finish', {
         data: props
      })
      return res.data.data
   }


   async getReports(quiz_id: number, course_id: number) {
      const res: any = await this.get('/reports', {
         params: {
            quiz_id,
            course_id
         }
      })
      return res.data.data
   }

   async getReport(id: number) {
      const res: any = await this.get('/report', {
         params: { id }
      })
      return res.data.data
   }

}

export default new QuizActivityRouter()