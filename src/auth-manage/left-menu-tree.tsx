import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import {RichTreeView} from '@mui/x-tree-view/RichTreeView';
import {TreeViewBaseItem} from '@mui/x-tree-view/models';
import {
    unstable_useTreeItem2 as useTreeItem2,
    UseTreeItem2Parameters,
} from '@mui/x-tree-view/useTreeItem2';
import {
    TreeItem2Content,
    TreeItem2IconContainer,
    TreeItem2GroupTransition,
    TreeItem2Label,
    TreeItem2Root,
} from '@mui/x-tree-view/TreeItem2';
import {TreeItem2Icon} from '@mui/x-tree-view/TreeItem2Icon';
import {TreeItem2Provider} from '@mui/x-tree-view/TreeItem2Provider';
import {useEffect} from "react";

type MENU_BASIC_ITEM = TreeViewBaseItem<{
    id: string;
    label: string;
    disabled?: boolean;
    path?: string
}>;


// function NavigateTo(path: string) {
//     const navigate = useNavigate();
//     navigate(path)
// }

const MENU_MAP = {}

const MAIN_MENU_ITEMS: MENU_BASIC_ITEM[] = [
    {
        id: 'grid',
        label: 'Data Grid1',
        children: [
            {id: '1', label: '角色管理', path: '/role/list'},
            {id: '2', label: '用户管理', path: '/user/list'},
            {id: '3', label: '菜单管理', path: '/auth/list'},
        ],
    },
    {
        id: '4',
        label: 'Date and Time Pickers',
        children: [
            {id: '5', label: '@mui/x-date-pickers'},
            {id: '6', label: '@mui/x-date-pickers-pro'},
        ],
    },
    {
        id: '7',
        label: 'Charts',
        children: [{id: '8', label: '@mui/x-charts'}],
    },
    {
        id: '9',
        label: 'Tree View',
        children: [
            {id: '10', label: '@mui/x-tree-view'},
            {id: '11', label: '@mui/x-tree-view-pro', disabled: true},
        ],
    },
    {
        id: '12',
        label: 'Scheduler',
        disabled: true,
        children: [{id: 'scheduler-community', label: '@mui/x-scheduler'}],
    },
];

function isItemDisabled(item) {
    return item.disabled ?? false;
}

const CustomTreeItemContent = styled(TreeItem2Content)(({theme}) => ({
    padding: theme.spacing(0.5, 1),
}));


interface CustomTreeItemProps
    extends Omit<UseTreeItem2Parameters, 'rootRef'>,
        Omit<React.HTMLAttributes<HTMLLIElement>, 'onFocus'> {
    path: string
}

function clickMenu (event: React.SyntheticEvent,
                     itemId: string,
                     isSelected: boolean,) {
    if (isSelected) {
        console.log('clickMenuItem' + itemId)
        return;
    }
}

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
    props: CustomTreeItemProps,
    ref: React.Ref<HTMLLIElement>,
) {
    const {id, itemId, label, disabled, children, path, ...other} = props;

    const {
        getRootProps,
        getContentProps,
        getIconContainerProps,
        getLabelProps,
        getGroupTransitionProps,
        status,
    } = useTreeItem2({id, itemId, children, label, disabled, rootRef: ref});
    console.log('CustomTreeItem' + path)
    return (
        <TreeItem2Provider itemId={itemId}>
            <TreeItem2Root {...getRootProps(other)}>
                <CustomTreeItemContent {...getContentProps()} >
                    <TreeItem2IconContainer {...getIconContainerProps()}>
                        <TreeItem2Icon status={status}/>
                    </TreeItem2IconContainer>
                    <Box sx={{flexGrow: 1, display: 'flex', gap: 1}}>
                        <Avatar
                            sx={(theme) => ({
                                background: theme.palette.primary.main,
                                width: 24,
                                height: 24,
                                fontSize: '0.8rem',
                            })}
                        >
                            {(label as string)[0]}
                        </Avatar>
                        <TreeItem2Label {...getLabelProps()} />
                    </Box>
                </CustomTreeItemContent>
                {children && <TreeItem2GroupTransition {...getGroupTransitionProps()} />}
            </TreeItem2Root>
        </TreeItem2Provider>
    );
});


function createMenuMap(menuList: MENU_BASIC_ITEM[], menuMap:{}) {
    menuList.forEach(menu => {
        menuMap[menu.id] = menu;
        if(menu.children){
            createMenuMap(menu.children, menuMap);
        }
    })
    return menuMap
}

export default function LeftMenuTree() {

    useEffect(() => {
        console.log('MenuMap START----------')
        createMenuMap(MAIN_MENU_ITEMS, MENU_MAP)
        console.log('MenuMap END----------', MENU_MAP)
    }, []);


    return (
        <RichTreeView items={MAIN_MENU_ITEMS}
                      isItemDisabled={isItemDisabled}
                      slots={{item: CustomTreeItem}}
                      onItemSelectionToggle={clickMenu}
        />
    );
}