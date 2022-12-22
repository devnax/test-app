import Router from './core/BaseRouter'
import { UserMetaFields, UserMetaQuery, UserMeta } from './core/types/Model'

interface Args {
   data: UserMetaFields;
   where: UserMetaQuery;
   model: UserMeta
}

class UserMetaRoutes extends Router<Args> {
   basePath: string = `/user-metas`
}

export default new UserMetaRoutes()