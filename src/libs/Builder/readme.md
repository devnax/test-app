```tsx
import { Builder, BuilderWrapper, Droppable  } from 'builder'

class handler extends Builder{}

const h = new handler

<BuilderWrapper id="builder" handler={h} {...DragulaDrapperProps}>
   children
   <Droppable id="first"/>
   another child
   <Droppable id="second"/>
</BuilderWrapper>

const html = h.renderHTML(droopableId)
const json = h.renderTree(droopableId)


```