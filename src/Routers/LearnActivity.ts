import { BaseRouter, BaseRouterArgs } from '@src/Routers'

interface Args extends BaseRouterArgs {
   data: {
      enroll_id: number;
      topic_id: number;
   };
   where: {};
   model: {
      enroll_id: number;
      topic_id: number;
   }
}

class LearnActivity extends BaseRouter<Args> {
   basePath: string = `/learn-activities`

}

export default new LearnActivity()