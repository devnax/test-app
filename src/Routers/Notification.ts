import Router from './core/BaseRouter'
import { NotificationFields, NotificationQuery, Notification } from './core/types/Model'

interface Args {
   data: NotificationFields;
   where: NotificationQuery;
   model: Notification
}

class NotificationRoutes extends Router<Args> {
   basePath: string = `/notifications`
}

export default new NotificationRoutes()