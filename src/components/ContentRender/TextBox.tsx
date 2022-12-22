import React from 'react'
import { ContentData } from './types'

const Textbox = ({ data }: ContentData) => {
   return data.content ? <div dangerouslySetInnerHTML={{ __html: data.content }} /> : <></>
}


export default Textbox