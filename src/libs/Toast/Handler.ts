import { Store } from 'state-range'
import { ToastShowProps } from './types'

class RDAdminToastHandler extends Store<any> {

   show(options: ToastShowProps) {
      if (options.title) {
         const { _id }: any = this.insert({
            type: "default",
            ...options
         })
         this.startTime(_id)
      }
   }

   pauseTime(_id: string) {
      const item = this.findById(_id)
      if (typeof item?.timer === 'number') {
         return clearInterval(item.timer)
      }

      this.update({ timer: false }, _id)
   }

   startTime(_id: string) {
      const item = this.findById(_id)
      let timer: any = false
      if (item?.autoclose === undefined || item?.autoclose === true) {
         this.pauseTime(_id)
         timer = setTimeout(() => {
            this.delete(_id)
         }, 6000)
      }
      this.update({ timer }, _id)
   }

   close(_id: string) {
      this.pauseTime(_id)
      this.delete(_id)
   }
}

export default new RDAdminToastHandler()