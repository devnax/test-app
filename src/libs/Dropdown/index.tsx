import React, { useEffect } from 'react';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import Box from '@mui/material/Box';
import { withMemo, withStore } from 'state-range';
import Handler, { Dropdown } from './Handler';
import ListRender from './ListRender';
import { DropdownItemViewProps } from './types';
export default Dropdown;


const _DropdownItemView = ({ dropdown }: DropdownItemViewProps) => {
    const { _id, active, anchor, content, props }: any = dropdown;

    let render: any = content;
    if (Array.isArray(content)) {
        render = <ListRender items={content} />;
    }



    return (
        <Popper
            anchorEl={anchor}
            placement="right-start"
            transition
            disablePortal
            style={{ zIndex: 9999999 }}
            {...(props || {})}
            open={active}
        >
            {({ TransitionProps, placement }: any): any => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom'
                    }}
                >
                    <Box data-dropdown={_id}>{render}</Box>
                </Grow>
            )}
        </Popper>
    );
};

const DropdownItemView = withMemo(_DropdownItemView, ({ dropdown }: DropdownItemViewProps) => [dropdown.observe]);

const MainView = () => {
    const dropdowns = Handler.findAll();

    const closeDropdown = (e: any) => {
        const find = document.querySelectorAll('[data-dropdown]');
        let isContained = false;
        find.forEach((item: any) => {
            if (item.contains(e.target)) {
                const id = item.getAttribute('data-dropdown');
                const menu = Handler.findById(id);
                if (menu) {
                    Handler.hideChild(menu._id);
                    isContained = true;
                }
            }
        });

        if (!isContained) {
            Handler.hide();
        }
    };

    useEffect(() => {
        if (dropdowns.length) {
            document.removeEventListener('click', closeDropdown);
            document.addEventListener('click', closeDropdown, true);
        } else {
            document.removeEventListener('click', closeDropdown);
        }
        return () => document.removeEventListener('click', closeDropdown);
    }, [dropdowns.length]);

    return (
        <>
            <Box id="ctx-menu" position="fixed" zIndex={9999999999999}></Box>
            {dropdowns.map((dropdown: any, idx: number) => (
                <DropdownItemView key={idx} dropdown={dropdown} />
            ))}
        </>
    );
};

export const DropdownView = withStore(MainView, () => [Handler.observeStoreData()]);
