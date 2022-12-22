import Router from './core/BaseRouter'
import { PostFields, PostQuery, Post } from './core/types/Model'

interface ArgsProps {
   where: PostQuery;
   data: PostFields;
   model: Post
}

class PostRoutes extends Router<ArgsProps> {
   basePath: string = `/posts`
}

export default new PostRoutes()