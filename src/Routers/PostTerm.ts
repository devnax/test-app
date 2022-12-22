import Router from './core/BaseRouter'
import { PostTermFields, PostTermQuery, PostTerm } from './core/types/Model'

interface Args {
   data: PostTermFields;
   where: PostTermQuery;
   model: PostTerm
}

class PostTermRoutes extends Router<Args> {
   basePath: string = `/post-terms`
}

export default new PostTermRoutes()