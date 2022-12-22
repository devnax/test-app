import { BaseRouterArgs } from '@src/Routers'
import Router from './core/BaseRouter'

interface Args extends BaseRouterArgs {
   data: {
      name: number;
      email: string;
      phone: number;
      course: string[];
   };
   where: {};
   model: {
      name: number;
      email: string;
      phone: number;
      course: string[];
   }
}

class FreeClass extends Router<Args> {
   basePath: string = `/freeclass`
}

export default new FreeClass()