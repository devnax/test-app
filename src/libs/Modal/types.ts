import { BoxProps } from '@mui/material/Box';
import { LayerOptionProps } from '../Layer/types';

export interface ModalOptionsProps extends LayerOptionProps {
    closeButton?: boolean;
    props?: BoxProps;
}
