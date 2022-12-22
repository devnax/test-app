import React from 'react'
import { ContentData } from './types'
import GridView from './Grid'
import TextBox from './TextBox'
import HTML from './HTML'
import TabView from './Tab'
import Accordion from './Accordion'
import Math from './Math'
import ImageView from './Image'

class ContentGenerator {
   set(items: ContentData[]) {
      if (!items || !items.length || !Array.isArray(items)) {
         return <></>
      }

      return items.map((item: any, idx: number) => {
         switch (item.type) {
            case "grid":
               return <GridView {...item} key={idx} />
            case "html":
               return <HTML {...item} key={idx} />
            case "math":
               return <Math {...item} key={idx} />
            case "image":
               return <ImageView {...item} key={idx} />
            case "textbox":
               return <TextBox {...item} key={idx} />
            case "tab":
               return <TabView {...item} key={idx} />
            case "accordion":
               return <Accordion {...item} key={idx} />
         }
         return ''
      });
   }

}

export default new ContentGenerator()