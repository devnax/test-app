import { Store } from "state-range";
import Auth from '@src/System/Auth';
import EnrollRouter from '@src/Routers/Enroll'
import Cookie from "@src/helpers/Cookie";
import { decript } from "@src/Routers/core/Encript";

export interface CountriesProps {
   name: string;
   country_code: string;
   currency_rate: string;
   currency_symbol: string;
   slug: string;
}

export interface SystemSettingProps {
   global_country: number;
}

export type UserCourse = {
   course_id: number;
   enroll_date: string;
   expire_date: string;
}

interface SystemPorps {
   user_courses: UserCourse[]
}


class System extends Store<any, SystemPorps> {

   async getUserCoursesInfo() {
      const exists = this.getMeta("user_courses")
      const auth = Auth.getAuth()
      if (auth && !exists) {
         const courses = await EnrollRouter.find({ user_id: auth.id })
         if (courses?.length) {
            this.setMeta("user_courses", courses as any)
         }
      }
      return this.getMeta("user_courses")
   }

   getUserCountry() {
      const country = Cookie.get("__uloc")
      if (country) {
         return decript(country)
      }
      return {
         code: "US",
         rate: 1,
         symbol: "$",
         symbol_name: "USD",
      }
   }

   formatePrice(price: number | string) {
      const countryInfo = this.getUserCountry()
      const normal = parseFloat(price || 0 as any)
      return {
         normal,
         local: normal * countryInfo.rate
      }
   }
}

export default new System