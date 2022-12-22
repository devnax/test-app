import { parseCookies, setCookie, destroyCookie } from 'nookies'
import type { NextApiResponse, NextPageContext } from "next";

let options = {
   maxAge: (24 * 60 * 60) * 7, // 24 hours
   path: '/',
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
   get: (key: string, ctx?: NextApiResponse) => {
      const cookies = parseCookies(ctx)
      return cookies[key]
   },
   set: (key: string, value: any, opt?: object, ctx?: Pick<NextPageContext, 'res'>,) => {
      options = { ...options, ...(opt || {}) }
      setCookie(ctx, key, value, options)
   },
   delete: (key: string, ctx?: Pick<NextPageContext, 'res'>) => {
      destroyCookie(ctx, key, options)
   }
}