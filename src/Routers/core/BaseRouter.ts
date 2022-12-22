import { AxiosRequestConfig } from 'axios'
import Router from './Router'
import { BaseRouterArgs } from './types'
import ApiConfig from './ApiConfig'

abstract class BaseRouter<Args extends BaseRouterArgs> extends Router<Args["model"]> {

   async beforeCreate?(data: Args['data']): Promise<Args['data']>
   async beforeUpdate?(data: Args['data'], where: Args['where']): Promise<{ data: Args['data']; where: Args['where'] }>
   async beforeDelete?(where: Args['where']): Promise<Args['where']>
   async beforeFind?(where: Args['where']): Promise<Args['where']>
   async beforeCount?(where: Args['where']): Promise<Args['where']>

   catchError(err: any) {
      const onFaild = ApiConfig.get("onFaild")
      if (typeof onFaild === 'function') {
         onFaild(err)
      } else {
         throw err
      }
   }


   async create(data: Args['data'], options?: AxiosRequestConfig): Promise<Args['model'] | void> {
      if (this.beforeCreate) data = await this.beforeCreate(data)

      const res = await this.post('/', {
         ...options,
         data
      })
      if (res) return res.data?.data as any
   }

   async update(data: Partial<Args['data']>, where: Args['where'], options?: AxiosRequestConfig): Promise<{ count: number }> {
      if (this.beforeUpdate) {
         let q = await this.beforeUpdate(data, where)
         data = q.data
         where = q.where
      }
      const res: any = await this.put('/', {
         ...options,
         data,
         params: where
      })
      return res?.data?.data
   }

   async delete(where: Args['where'], options?: AxiosRequestConfig): Promise<{ count: number }> {
      if (this.beforeDelete) where = await this.beforeDelete(where)

      const res: any = await this.del('/', {
         ...options,
         params: where
      })
      return res?.data?.data
   }

   async find(where: Args['where'], options?: AxiosRequestConfig): Promise<Args['model'][] | null> {
      if (this.beforeFind) where = await this.beforeFind(where)
      const res: any = await this.get('/', {
         ...options,
         params: { perpage: 30, ...where }
      })
      return res?.data.data
   }

   async count(where: Args['where'], options?: AxiosRequestConfig): Promise<number> {
      if (this.beforeCount) where = await this.beforeCount(where)
      const res: any = await this.get('/count', {
         ...options,
         params: where
      })
      return res?.data.data || 0
   }

}

export default BaseRouter