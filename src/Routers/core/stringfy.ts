import * as piece from 'json-piece'
const key = "$soft."

const stringfy = {
   toString: (data: object | any[]) => {
      const str = piece.toString(data)
      return `${key}${str}`
   },
   isStringfy: (data: string) => {
      if (data.startsWith(key)) {
         return piece.isStringfy(data.replace(key, ''))
      }
      return false
   },
   parse: (data: string) => {
      if (data.startsWith(key)) {
         return piece.parse(data.replace(key, ''))
      }
   }
}
export default stringfy