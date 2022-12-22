import { BaseRouterArgs } from '@src/Routers'
import Router from './core/BaseRouter'

interface Args extends BaseRouterArgs {
   data: {
      name: number;
      email: string;
      phone: number;
      message: string;
   };
   where: {};
   model: {
      name: number;
      email: string;
      phone: number;
      message: string;
   }
}

class Contact extends Router<Args> {
   basePath: string = `/contact`
}

export default new Contact()