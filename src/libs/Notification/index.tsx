import NotificationView from "./NotificationView";
import Handler from './Handler'
import { NotificationProps, NotificationSettingProps } from './types'

export {
   NotificationView
}

interface PublicNotificationInterface{
   create: (options: NotificationProps) => void;
   remove: (id: string | number) => void;
   setting: (options?: NotificationSettingProps) => NotificationSettingProps;
   loading: (is: boolean) => void;
   isLoading: () => boolean;
   read: (id: string | number) => void;
   unRead: (id: string | number) => void;
}

const PublicNotification: PublicNotificationInterface = {
   create: Handler.create.bind(Handler),
   remove: Handler.remove.bind(Handler),
   setting: Handler.setting.bind(Handler),
   loading: Handler.loading.bind(Handler),
   isLoading: Handler.isLoading.bind(Handler),
   read: Handler.read.bind(Handler),
   unRead: Handler.unRead.bind(Handler),
}

export default PublicNotification
