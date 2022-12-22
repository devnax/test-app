import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { encript, decript } from './Encript';
import { isArray, isObject } from 'tiny-utils'
import stringfy from './stringfy';
import { ResponseJson, HandlerFunction } from './types';
import ApiConfig from './ApiConfig';
// import * as piece from 'json-piece'

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV !== 'production'

abstract class AxiosRouter<Data = {}> {
  abstract basePath: string;
  encript_query = isDev ? false : true;

  private controllers: { [key: string]: AbortController } = {}
  private use_mids: { [key: string]: HandlerFunction[] } = {}
  private global_mids: HandlerFunction[] = []
  configs: AxiosRequestConfig = {}
  headers: AxiosRequestConfig["headers"] = {}

  async request?(_options: AxiosRequestConfig): Promise<AxiosRequestConfig | void>;
  async response?(_res: AxiosResponse): Promise<AxiosResponse | void>
  catchError?(err: AxiosError): void;

  private _path(path: string) {
    path = path.replace(/\/\//gi, '/')
    return `${ApiConfig.get("api_url") + this.basePath}${path}`.replace(/\/$/, '')
  }

  private _configs(path: string, options?: AxiosRequestConfig): AxiosRequestConfig {
    const abortController = new AbortController()
    this.controllers[path + options?.method?.toLowerCase()] = abortController
    return {
      signal: abortController.signal,
      withCredentials: true,
      timeout: 5000,
      ...this.configs,
      headers: {
        ...this.headers,
        ...this?.configs.headers
      },
      ...options
    }
  }

  private async excute(path: string, options: AxiosRequestConfig) {
    if (!this.basePath) {
      throw new Error("baseUri not found")
    }
    path = this._path(path)
    const use_mids = this.use_mids[path] || []
    const global_mids = this.global_mids || []
    const middlewares = [...global_mids, ...use_mids]
    try {
      for await (let middleware of middlewares) {
        await middleware(options)
      }
    } catch (err) {
      delete this.controllers[path]
      throw err
    }
    let configs: any = this._configs(path, options)
    configs.headers.map = location.origin

    if (this.request) {
      const c = await this.request(configs)
      if (c !== undefined) {
        configs = c
      }
    }

    if (Object.keys(configs.params || {}).length) {
      for (let key in configs.params) {
        const val = configs.params[key]
        if (val === null) {
          configs.params[key] = "null"
        } else if (isObject(val) || isArray(val)) {
          configs.params[key] = stringfy.toString(val)
        }
      }
      if (this.encript_query) {
        configs.params = { _: encript(configs.params) }
      }
    }

    if (Object.keys(configs.data || {}).length) {
      for (let key in configs.data) {
        const val = configs.data[key]
        if (isObject(val) || isArray(val)) {
          configs.data[key] = stringfy.toString(val)
        }
      }
    }

    let res: AxiosResponse<ResponseJson<Data>> = await axios({ url: path, ...configs })

    if (typeof res.data?.data === 'string') {
      res.data.data = decript(res.data.data)
    }

    if (this.response) {
      const r = await this.response(res)
      if (r !== undefined) {
        res = r
      }
    }
    delete this.controllers[path]
    return res
  }

  use(path: string | HandlerFunction, handler?: HandlerFunction, ...handlers: HandlerFunction[]) {
    let handlersFN = []
    if (handler) {
      handlersFN.push(handler)
    }
    if (handlers.length) {
      handlersFN = [...handlersFN, ...handlers]
    }

    if (typeof path === 'string') {
      path = this._path(path)
      this.use_mids[path] = handlersFN
    } else {
      this.global_mids = [...this.global_mids, path, ...handlersFN]
    }
  }

  async get(path: string, options?: AxiosRequestConfig) {
    try {
      // const key = path + piece.toString(options?.params)
      // const has = localStorage.getItem(key)
      // console.log(has);

      // if (has) {
      //   return piece.parse(has)
      // }
      const res = await this.excute(path, { method: "get", ...options })
      // if (res.data.data) {
      //   localStorage.setItem(key, piece.toString(res.data.data))
      // }

      return res
    } catch (err) {
      if (this.catchError) {
        return this.catchError(err as any)
      } else {
        throw err
      }
    }
  }

  async post(path: string, options?: AxiosRequestConfig) {
    try {
      return await this.excute(path, { method: "post", ...options })
    } catch (err) {
      if (this.catchError) {
        return this.catchError(err as any)
      } else {
        throw err
      }
    }

  }

  async put(path: string, options?: AxiosRequestConfig) {
    try {
      return await this.excute(path, { method: "put", ...options })
    } catch (err) {
      if (this.catchError) {
        return this.catchError(err as any)
      } else {
        throw err
      }
    }
  }

  async del(path: string, options?: AxiosRequestConfig) {
    try {
      return await this.excute(path, { method: "delete", ...options })
    } catch (err) {
      if (this.catchError) {
        return this.catchError(err as any)
      } else {
        throw err
      }
    }
  }

  async options(path: string, options?: AxiosRequestConfig) {
    try {
      return await this.excute(path, { method: "OPTIONS", ...options })
    } catch (err) {
      if (this.catchError) {
        return this.catchError(err as any)
      } else {
        throw err
      }
    }
  }

  async patch(path: string, options?: AxiosRequestConfig) {
    try {
      return await this.excute(path, { method: "PATCH", ...options })
    } catch (err) {
      if (this.catchError) {
        return this.catchError(err as any)
      } else {
        throw err
      }
    }
  }

  abort(method: string, path: string) {
    const controller = this.controllers[path + method.toLowerCase()] as AbortController
    if (controller) {
      controller.abort()
    }
  }

  isFatching(method: string, path: string) {
    if (this.controllers[path + method.toLowerCase()]) {
      return true;
    }
    return false
  }
}

export default AxiosRouter