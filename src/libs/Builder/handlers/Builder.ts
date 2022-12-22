import { noDispatch, Store } from "state-range";
import { StoreProps, StoreRowProps, WidgetOptions } from '../types'


export interface CreateProps {
   containerId: string;
   widgetId: string;
   data?: { [key: string]: any },
   props?: { [key: string]: any },
   info?: { [key: string]: any },
}


abstract class BuildertHandler<Meta = any> extends Store<StoreProps, Meta> {

   Widget: Map<string, WidgetOptions>;

   constructor() {
      super()
      this.Widget = new Map
   }

   create(options: CreateProps) {
      return this.insert({
         data: {},
         props: {},
         info: {},
         ...options
      })
   }

   setData(_id: string, data: { [key: string]: any }) {
      const item = this.findFirst({ _id })
      this.update({ data: { ...item?.data, ...data } }, { _id })
   }

   setProps(_id: string, props: { [key: string]: any }) {
      const item = this.findFirst({ _id })
      this.update({ props: { ...item?.props, ...props } }, { _id })
   }

   setInfo(_id: string, info: { [key: string]: any }) {
      const item = this.findFirst({ _id })
      this.update({ info: { ...item?.info, ...info } }, { _id })
   }

   getItem(_id: string) {
      return this.findFirst({ _id })
   }

   getContainerItems(containerId: string) {
      return this.find({ containerId })
   }

   deleteItem(_id: string) {
      noDispatch(() => {
         const item = this.getItem(_id)
         if (item) {
            const widget = this.Widget.get(item.widgetId)
            widget?.onDelete && widget.onDelete(item)
         }
         this.delete(_id)
         const childs = this.getContainerItems(_id)
         for (let child of childs) {
            this.deleteItem(child._id)
         }
      })
      this.dispatch()
   }

   duplicateItem(_id: string, containerId?: string) {
      let created: any;
      noDispatch(() => {
         const item: any = this.getItem(_id)
         if (item) {
            const widget = this.Widget.get(item.widgetId)
            const itemIndex = this.getIndex(_id) as any
            const childs = this.getContainerItems(item._id)
            created = this.insertAfter({
               containerId: containerId || item.containerId,
               widgetId: item.widgetId,
               data: JSON.parse(JSON.stringify(item.data)),
               props: JSON.parse(JSON.stringify(item.props)),
               info: {},
            }, itemIndex + 1)
            widget?.onDuplicate && widget.onDuplicate(item, created)

            for (let child of childs) {
               this.duplicateItem(child._id, created._id)
            }
         }
      })
      this.dispatch()
      return created
   }

   renderHTML(droppableId: string) {
      const items = this.getContainerItems(droppableId)
      let html = ''
      for (let item of items) {
         const widget = this.Widget.get(item.widgetId)
         html += widget?.getHTML ? widget?.getHTML(item) : ""
      }
      return html
   }

   renderTree(containerId: string, callback?: (item: StoreRowProps) => void | object) {
      const items = this.getContainerItems(containerId)
      let tree = []
      for (let item of items) {
         const widget = this.Widget.get(item.widgetId)
         if (widget?.getTree) {
            const data = widget.getTree(item)
            if (item) {
               let d: any = data
               if (callback) {
                  d = callback(d) || data
               }
               tree.push(d)
            }
         }
      }
      return tree
   }

   getJson(_id: string) {
      const item = this.getItem(_id)
      let tree: any = {}
      if (item) {
         tree = {
            ...item,
            children: []
         }
         delete tree._id
         delete tree.observe
         delete tree.info
         const childs: any = this.getContainerItems(_id)
         for (let child of childs) {
            tree.children.push(this.getJson(child._id))
         }
      }
      return tree
   }

}

export default BuildertHandler