import Cookie from '@helpers/Cookie'
import { AuthRouter, UserRoles } from '@src/Routers'
import Encript from '@src/helpers/Encript'



class Auth {

   async login({ token, rest, auth }: { token: string; rest: string; auth: string }) {
      Cookie.set('keep', token, {
         maxAge: 24 * 60 * 60, // 1 day
      })
      Cookie.set('keep-rest', rest, {
         maxAge: (24 * 60 * 60) + 60, // 1 day 1 hrs
      })
      Cookie.set("AUTH", auth)
   }

   async logout() {
      Cookie.delete('keep')
      Cookie.delete('keep-rest')
      Cookie.delete('AUTH')
   }

   isLoagin() {
      return Cookie.get("keep-rest") ? true : false
   }

   getAuth() {
      try {
         const keepRest = Cookie.get("keep-rest")
         if (!keepRest) {
            this.logout()
            return
         }
         const encriptedAuth = Cookie.get("AUTH")
         const auth = Encript.decript(encriptedAuth)
         return auth
      } catch (err) { }
   }

   async setAuth() {
      Cookie.delete("AUTH")
      await AuthRouter.getAuth()
   }

   is(role: UserRoles) {
      const user: any = this.getAuth()
      return user?.role === role
   }

   isAdmin() {
      return this.is('admin')
   }

}

export default new Auth()