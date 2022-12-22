import { ReactElement } from "react";
import { DropdownArrayType } from '../Dropdown/types'

export interface NotificationProps {
   id: string | number;
   title: string;
   content?: string;
   icon?: ReactElement;
   created?: string | number;
   notify?: boolean;
   read?: boolean;
}



export interface NotificationSettingProps {
   onLoad?: Function;
   onLoadMore?: Function;
   onItemClick?: (id: string | number) => void;
   itemMenu?: DropdownArrayType[]
}