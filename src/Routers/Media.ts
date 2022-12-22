import BaseRouter from './core/BaseRouter'
import { AxiosRequestConfig } from 'axios'
import { BaseRouterArgs } from './core/types';
import { Media, MediaQuery } from './core/types/Model'

interface Args extends BaseRouterArgs {
   data: { file: File };
   where: MediaQuery;
   model: Media
}

class MediaRoutes extends BaseRouter<Args> {
   basePath: string = `/medias`

   configs: AxiosRequestConfig<any> = {
      timeout: undefined,
      headers: {
         'Content-Type': 'multipart/form-data'
      }
   }

   async beforeCreate(data: any) {
      const formData = new FormData()
      formData.append('file', data.file)
      return formData as any
   }
}

export default new MediaRoutes()