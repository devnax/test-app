import React from 'react'
import { ContentData } from './types'
import GridView from './Elements/Grid'
import Textbox from './Elements/TextBox'
import HTML from './Elements/HTML'
import TabView from './Elements/Tab'
import Accordion from './Elements/Accordion'
import Math from './Elements/Math'
import ImageView from './Elements/Image'

// Questions
import SingleChoice from './Questions/SingleChoice'
import MultipleChoice from './Questions/MultipleChoice'
import Blank from './Questions/Blank'
import Dropdown from './Questions/Dropdown'
import Essay from './Questions/Essay'
import ImageMap from './Questions/ImageMap'
import Graph from './Questions/Graph'
import TableCheckList from './Questions/TableCheckList'
import Sorting from './Questions/Sorting'
import DragDrop from './Questions/DragDrop'
import FreeChoice from './Questions/FreeChoice'

class ContentRenderar {
   render(items: ContentData[]) {

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
               return <Textbox {...item} key={idx} />
            case "tab":
               return <TabView {...item} key={idx} />
            case "accordion":
               return <Accordion {...item} key={idx} />

            // Questions
            case "single_choice":
               return <SingleChoice {...item} key={idx} />
            case "multiple_choice":
               return <MultipleChoice {...item} key={idx} />
            case "fill_blank":
               return <Blank {...item} key={idx} />
            case "dropdown":
               return <Dropdown {...item} key={idx} />
            case "essay":
               return <Essay {...item} key={idx} />
            case "image_map":
               return <ImageMap {...item} key={idx} />
            case "graph":
               return <Graph {...item} key={idx} />
            case "table_checklist":
               return <TableCheckList {...item} key={idx} />
            case "sorting":
               return <Sorting {...item} key={idx} />
            case "drag_drop":
               return <DragDrop {...item} key={idx} />
            case "free_choice":
               return <FreeChoice {...item} key={idx} />
         }
      });
   }
}

export default new ContentRenderar()