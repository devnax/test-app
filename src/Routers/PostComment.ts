import Router from './core/BaseRouter'
import { PostCommentFields, PostCommentQuery, PostComment } from './core/types/Model'

interface Args {
   data: PostCommentFields;
   where: PostCommentQuery;
   model: PostComment
}

class PostCommentRoutes extends Router<Args> {
   basePath: string = `/post-comments`
}

export default new PostCommentRoutes()