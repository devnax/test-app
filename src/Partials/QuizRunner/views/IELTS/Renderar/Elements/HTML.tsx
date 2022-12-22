import React from 'react'
import Anotation from '../../../Anotation'
import { ContentData } from '../types'

const HTML = ({ data }: ContentData) => {
   return data.content ? <Anotation id={data.uid} content={data.content} /> : <></>
}


export default HTML