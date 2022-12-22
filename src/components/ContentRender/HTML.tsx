import React from 'react'
import { ContentData } from './types'

const HTML = ({ data }: ContentData) => {
   return data.content ? <div dangerouslySetInnerHTML={{ __html: data.content }} /> : <></>
}


export default HTML