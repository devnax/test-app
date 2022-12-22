import BaseRouter from './core/BaseRouter'
import { BaseRouterArgs } from './core/types';
import { User } from './core/types/Model'

export type AuthProps = Omit<User, 'password' | 'creator_id'> & {
   photo: string
}

interface Args extends BaseRouterArgs {
   responseData: AuthProps
}


class AuthRoutes extends BaseRouter<Args> {
   basePath: string = `/auth`

   async login(username: string, password: string): Promise<{ token: string; user: AuthProps }> {
      const res: any = await this.post('/login', {
         data: { username, password }
      })
      return res?.data?.data
   }

   async register(email: string, password: string): Promise<User> {
      const res: any = await this.post('/register', {
         data: { email, password }
      })
      return res.data?.data
   }

   async getAuth(query?: any): Promise<AuthProps | void> {
      const res = await this.get('/', {
         params: query
      })
      if (res) return res.data?.data
   }

}

export default new AuthRoutes