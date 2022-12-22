import AES from 'crypto-js/aes'
import Utf8 from 'crypto-js/enc-utf8'
import * as piece from 'json-piece'
import ApiConfig from './ApiConfig'

export const encript = (data: any) => {
   if (typeof data === 'object') data = piece.toString(data)
   return encodeURIComponent(AES.encrypt(data, ApiConfig.get("guard")).toString())
}

export const decript = (encriptVal: string) => {
   const dec = AES.decrypt(decodeURIComponent(encriptVal), ApiConfig.get("guard")).toString(Utf8)
   if (piece.isStringfy(dec)) return piece.parse(dec)
   if (dec) return dec
}