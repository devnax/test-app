import React, { FC, useMemo } from 'react'
import { withStore } from 'state-range'
import Handler from '../handlers/Builder'
import { Droppable as Drop } from '../draghost'
import { BUILDER_STATE } from '../index'
import { DroppableProps, StoreRowProps } from '../types'


const Empty = () => {
   return <div
      style={{
         padding: 20,
         fontWeight: 'bold',
         borderRadius: 8,
         textAlign: "center",
         opacity: .4,
      }}
   >No Item</div>
}


interface ItemProps extends StoreRowProps {
   handler: Handler;
   index: number;
   [key: string]: any
}


const Item = withStore((props: ItemProps) => {
   const { handler, _id, widgetId, onRender, index, ...rest } = props
   const widget = handler.Widget.get(widgetId)

   if (widget) {
      const Render = widget.render
      const r = <Render _id={_id} widgetId={widgetId} {...rest} />
      return <div id={_id}>
         {onRender ? onRender(r, { index, item: props }) : r}
      </div>
   }
   return <div></div>
}, ({ observe }) => [observe])


const Droppable: FC<DroppableProps> = (props) => {
   const { id, copy, accepts, onRender, disabled, selfOnly, whenEmpty, itemProps, ...rest } = props
   const handler: Handler = useMemo(() => {
      const wrapperId = BUILDER_STATE.currentWrapper as string
      BUILDER_STATE.wrappers[wrapperId] = {
         ...BUILDER_STATE.wrappers[wrapperId],
         droppables: {
            ...(BUILDER_STATE.wrappers[wrapperId]?.droppables || {}),
            [id]: props
         }
      }

      return BUILDER_STATE.wrappers[wrapperId].handler
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [copy, accepts, disabled, selfOnly,])

   const items = handler.getContainerItems(id)

   return (
      <Drop
         {...rest}
         id={id}
      >
         {
            items.length ? items.map((item, idx) => <Item key={item._id} index={idx} itemProps={itemProps} onRender={onRender} {...item} handler={handler} />) : <div id="empty_dropable" style={{ userSelect: "none" }}>{whenEmpty || <Empty />}</div>
         }
      </Drop>
   )
}

export default withStore(Droppable)