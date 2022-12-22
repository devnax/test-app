import React from 'react'
import { Store } from 'state-range'
import { NotificationProps, NotificationSettingProps } from './types'
import { DropdownArrayType } from '../Dropdown/types'
import Toast from '../Toast'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'


class RDAdminNotificatioHandler extends Store {

   create(options: NotificationProps) {
      if (!this.findFirst({ id: options.id })) {
         if (options.notify) {
            Toast.show({
               title: options.title,
               content: options.content,
               icon: options.icon || <NotificationsActiveIcon />
            })
         }
         this.insert({ ...options, read: false })
      }
   }

   remove(id: string | number) {
      this.delete({ id })
   }

   read(id: string | number) {
      this.update({ read: true }, { id })
   }

   unRead(id: string | number) {
      this.update({ read: false }, { id })
   }

   setting(options?: NotificationSettingProps): NotificationSettingProps {
      if (options) {
         const old = this.getMeta('settings', {})
         this.setMeta('settings', { ...old, ...options })
      }

      return this.getMeta('settings', {
         onLoad: undefined,
         onLoadMore: undefined
      })
   }

   loading(is: boolean) {
      this.setMeta('loading', is)
   }

   isLoading() {
      return this.getMeta('loading', false)
   }

   setItemMenu(menus: DropdownArrayType[]) {
      this.setting({ itemMenu: menus })
   }

   getItemMenu() {
      return this.setting().itemMenu
   }

}

export default new RDAdminNotificatioHandler()