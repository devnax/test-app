import { ReactElement } from "react"

export type ToastTypes = "success" | "error" | "warning" | "info" | "default"


export interface ToastShowProps{
   type?: ToastTypes
   title: string
   content?: string
   icon?: ReactElement
   autoclose?: boolean
   pauseOnHover?: boolean
   onClick?: Function
}


export interface ToastRowProps extends ToastShowProps{
   _id: string,
   observe: number
}


export interface ToastHandlerType{
   show: (options: ToastShowProps) => void;
}