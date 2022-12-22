import Router from './core/BaseRouter'
import { PostMetaFields, PostMetaQuery, PostMeta } from './core/types/Model'

interface Args {
   data: PostMetaFields;
   where: PostMetaQuery;
   model: PostMeta
}

class PostMetaRoutes extends Router<Args> {
   basePath: string = `/post-metas`
}

export default new PostMetaRoutes()