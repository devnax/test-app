import Router from './core/BaseRouter'
import { UserFields, UserQuery, User } from './core/types/Model'
interface Args {
   data: UserFields;
   where: UserQuery;
   model: User
}

class UserRoutes extends Router<Args> {
   basePath: string = `/users`
}

export default new UserRoutes()