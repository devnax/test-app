import highlight from './highlight'

export interface AnotionFactoryProps {
   content: string;
   dispatch: Function;
   spans: HTMLSpanElement[]
}

export type MarkOptions = {
   onBeforeMark: (span: HTMLSpanElement) => void;
   onAfterMark?: (marks: HTMLSpanElement[], factoryIds: string[]) => void;
}

export const AnotationFactory = new Map<string, AnotionFactoryProps>()

export const clearSelection = () => {
   const sel: any = window.getSelection();
   const selectedText = sel.toString()
   if (!selectedText) {
      return
   }
   if ((window as any).getSelection) {
      (window as any).getSelection().removeAllRanges();
   } else if ((document as any).selection) {
      (document as any).selection.empty();
   }
}

const hasAnotationParent = (span: HTMLSpanElement) => {
   let n = span
   for (let i = 50; i > 0; i++) {
      if (n && n.parentElement) {
         const parent = n.parentElement as HTMLElement
         const anotationId = parent?.getAttribute('data-anotation')
         if (anotationId) {
            return anotationId
         }
         n = parent
         continue;
      } else {
         break;
      }
   }
   return false
}



const mark = ({ onBeforeMark, onAfterMark }: MarkOptions) => {
   const spans = highlight(onBeforeMark)
   if (!spans) {
      return
   }

   // remove unknown marks
   const anotationIds: string[] = []
   const markIds: string[] = []
   for (let i = 0; i < spans.length; i++) {
      let mark: HTMLSpanElement = spans[i]
      const anId = hasAnotationParent(mark)
      if (!anId) {
         mark.outerHTML = mark.innerHTML
      } else {
         anotationIds.push(anId)
         markIds.push(mark.getAttribute('data-mark') as string)
      }
   }

   for (let id of anotationIds) {
      const ele = document.querySelector(`[data-anotation="${id}"]`)
      if (ele) {
         const fac = AnotationFactory.get(id) as AnotionFactoryProps
         AnotationFactory.set(id, {
            ...fac,
            content: ele.innerHTML
         })
         fac.dispatch()
      }
   }
   onAfterMark && setTimeout(() => {
      const marks = []

      for (let mid of markIds) {
         const mark = document.querySelector(`[data-mark="${mid}"]`)
         mark && marks.push(mark as HTMLSpanElement)
      }
      onAfterMark(marks, anotationIds)
   }, 50);
}

const removeMark = (markId: string) => {
   AnotationFactory.forEach((fac, facId) => {
      const spans = Array.from(fac.spans || [])

      fac.spans && fac.spans.forEach((span) => {
         if (markId === span.getAttribute("data-mark")) {
            span.outerHTML = span.innerHTML
            const ele = document.querySelector(`[data-anotation="${facId}"]`)
            if (ele) {
               AnotationFactory.set(facId, {
                  ...fac,
                  content: ele.innerHTML,
                  spans
               })
               fac.dispatch()
            }
         }
      })
   })
}

const restoreContent = (anotationId: string) => {
   const ele = document.querySelector(`[data-anotation="${anotationId}"]`)
   if (ele) {
      const fac = AnotationFactory.get(anotationId) as AnotionFactoryProps
      AnotationFactory.set(anotationId, {
         ...fac,
         content: ele.innerHTML
      })
      fac.dispatch()
   }
}


const getFactoryId = (span: HTMLSpanElement) => hasAnotationParent(span)


export const AnotationMarker = {
   mark,
   removeMark,
   restoreContent,
   getFactoryId
}
