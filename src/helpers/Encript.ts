import AES from 'crypto-js/aes'
import Utf8 from 'crypto-js/enc-utf8'
import * as piece from 'json-piece'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
   encript: (data: any) => {
      if (typeof data === 'object') {
         data = piece.toString(data)
      }
      const secret = process.env.APP_SECRET || process.env.NEXT_PUBLIC_APP_SECRET
      return AES.encrypt(data, secret as string).toString()
   },
   decript: (encriptVal: string) => {
      const secret = process.env.NEXT_PUBLIC_APP_SECRET
      const dec = AES.decrypt(encriptVal, secret as string).toString(Utf8)
      if (piece.isStringfy(dec)) {
         return piece.parse(dec)
      }
      return dec
   },
}