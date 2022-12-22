import { useId, useState } from 'react'

type Data = { [key: string]: any }
type Return<D> = [D, (nd: D) => void, string]
const State = new Map<string, Data>()

// eslint-disable-next-line import/no-anonymous-default-export
export default <D extends Data>(def: D): Return<D> => {
   const id = useId()
   const [, dispatch] = useState(0)

   !State.get(id) && State.set(id, def)

   return [State.get(id) as D, (newData: D) => {
      State.set(id, newData)
      dispatch(Math.random())
   }, id]
}