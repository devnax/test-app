import React from 'react';
import Modal, { ModalOptionsProps } from '../Modal';
import { AlertProps } from './types';
import AlertView from './AlertView';

class Alert {
    open(id: string, options: AlertProps, modalProps?: ModalOptionsProps) {
        Modal.open(`__ALERT_${id}__`, <AlertView {...options} />, {
            opacity: .1,
            closeButton: false,
            props: {
                minWidth: 350
            },
            ...modalProps
        });
    }

    close() {
        Modal.close();
    }
}

export default new Alert();
