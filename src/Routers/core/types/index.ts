import type { AxiosRequestConfig } from 'axios'
export type HandlerFunction = (options: AxiosRequestConfig) => Promise<void>

export type ResponseJson<D = any> = {
   status: "success" | "faild";
   message: string;
   data: D[] | D | string;
}

export interface BaseRouterArgs {
   where: any;
   data: any;
   model: any;
}





export type Modules =
   "USER_ROLE" |
   "USER" |
   "USER_META" |
   "POST" |
   "POST_META" |
   "POST_TERM" |
   "POST_COMMENT" |
   "TERM" |
   "MEDIA" |
   "SESSION" |
   "OPTION" |
   "NOTIFICATION" |
   "API_TOKEN" |
   "TRANSLATE";


export interface PermissionOptions {
   create: boolean;
   update: boolean;
   delete: boolean;
   read: boolean;
   read_all: boolean;
}


export interface PermissionProps {
   title: string;
   description?: string;
   module: Modules;
   options: PermissionOptions;
   query?: { [key: string]: any };
   data?: { [key: string]: any };
}


export interface PermissionType {
   [key: string]: PermissionProps
}
