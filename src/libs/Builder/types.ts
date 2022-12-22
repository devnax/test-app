import { ComponentType, HTMLAttributes, ReactElement } from "react";


interface RenderItemCbProps {
   item: StoreRowProps;
   index: number;
}

export interface DroppableProps extends HTMLAttributes<HTMLDivElement> {
   id: string;
   whenEmpty?: ReactElement;
   copy?: boolean;
   accepts?: string[];
   itemProps?: { [key: string]: any };
   sortableOnly?: boolean;
   onRender?: (ele: ReactElement, props: RenderItemCbProps) => ReactElement;
   disabled?: boolean; // accept and move will not work
   selfOnly?: boolean; // accept and drop on self only
}

export interface StoreProps {
   containerId: string;
   widgetId: string;
   data: { [key: string]: any },
   props: { [key: string]: any },
   info: { [key: string]: any },
}

export type StoreRowProps = StoreProps & {
   _id: string;
   observe: number;
}

export interface WidgetProps extends StoreRowProps {
   itemProps?: DroppableProps['itemProps']
}


export interface GetJsonProps extends StoreRowProps {
   children: GetJsonProps[]
}

export interface WidgetOptions {
   title: string;
   icon?: ReactElement;
   render: ComponentType<StoreRowProps>;
   getHTML?: (props: StoreRowProps) => string;
   getTree?: (props: StoreRowProps) => (object | void);
   onDuplicate?: (props: StoreRowProps, newProps: StoreRowProps) => void;
   onDelete?: (props: StoreRowProps) => void;
}

