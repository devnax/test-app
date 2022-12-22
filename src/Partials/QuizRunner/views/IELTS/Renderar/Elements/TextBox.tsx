import React, { memo } from 'react'
import Anotation from '../../../Anotation'
import { ContentData } from '../types'

const Textbox = ({ data }: ContentData) => {
   return data.content ? <Anotation id={data.uid} content={data.content} /> : <></>
}


export default memo(Textbox)