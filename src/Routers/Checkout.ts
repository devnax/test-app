import { BaseRouterArgs } from '@src/Routers'
import Router from './core/BaseRouter'
export type Methods = "Bkash" | "Paypal" | "Others" | "Free"

interface Args extends BaseRouterArgs {
   data: {
      course_id: number;
      product_title: string;
      amount: number;
      currency?: string;
      method: Methods;
      returnUrl: string;
   };
   where: {};
   model: {
      course_id: number;
      product_title: string;
      amount: number;
      currency_symbol: string;
      country_code: string;
      method: Methods;
      returnUrl: string;
   }
}

class CheckoutRouter extends Router<Args> {
   basePath: string = `/checkout`

}

export default new CheckoutRouter()