import { BaseRouterArgs } from '@src/Routers'
import Router from './core/BaseRouter'

interface Args extends BaseRouterArgs {
   data: {
      name: number;
      email: string;
      phone: number;
      country: "USA" | "UK" | "Malaysia" | "Canada" | "Australia"
   };
   where: {};
   model: {
      name: number;
      email: string;
      phone: number;
      apply_for: "undergraduate Studies" | "Master's"
   }
}

class Consulation extends Router<Args> {
   basePath: string = `/consulation`
}

export default new Consulation()