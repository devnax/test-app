import { BaseRouter, BaseRouterArgs } from '@src/Routers'

interface Args extends BaseRouterArgs {
   data: {
      course_id?: number;
      user_id?: number;
      progress: number;
   };
   where: {
      course_id?: number;
      user_id?: number;
   };
   model: {
      course_id: number;
      user_id: number;
   }
}

class Enroll extends BaseRouter<Args> {
   basePath: string = `/enrolls`

   async updateProgress(value: number) {
      return await this.put('/update-progress', {
         data: {
            value
         }
      })
   }
}

export default new Enroll()