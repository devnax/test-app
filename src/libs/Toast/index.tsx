import Handler from './Handler'
import ToastView from './ToastView'
import {ToastHandlerType}  from './types'
export * from './types'

const ToastHandler: ToastHandlerType = {
   show: Handler.show.bind(Handler),
}

export default ToastHandler

export {
   ToastView
}
