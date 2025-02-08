import * as React from 'react';
import Box from '@mui/material/Box';
import {
    DataGrid,
    GridActionsCellItem,
    GridRowId,
    GridColDef,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const initialRows = [
    {
        id: 1,
        roleName: 'Damien',
        roleLevel: 25,
        updateTime: '2024-04-01 00:00:00',
        lastLogin: '2024-04-01 00:00:00',
        isAdmin: true,
        country: 'Spain',
        discount: '',
        operator: 'sai'
    },
    {
        id: 2,
        roleName: 'Nicolas',
        roleLevel: 36,
        updateTime: '2024-04-01 00:00:00',
        lastLogin: '2024-04-01 00:00:00',
        isAdmin: false,
        country: 'France',
        discount: '',
        operator: 'sai'
    },
    {
        id: 3,
        roleName: 'Kate',
        roleLevel: 19,
        updateTime: '2024-04-01 00:00:00',
        lastLogin: '2024-04-01 00:00:00',
        isAdmin: false,
        country: 'Brazil',
        discount: 'junior',
        operator: 'sai'
    },
];

type Row = (typeof initialRows)[number];

export default function AuthManagerList() {
    const [rows, setRows] = React.useState<Row[]>(initialRows);

    const deleteUser = React.useCallback(
        (id: GridRowId) => () => {
            setTimeout(() => {
                setRows((prevRows) => prevRows.filter((row) => row.id !== id));
            });
        },
        [],
    );

    const toggleAdmin = React.useCallback(
        (id: GridRowId) => () => {
            setRows((prevRows) =>
                prevRows.map((row) =>
                    row.id === id ? { ...row, isAdmin: !row.isAdmin } : row,
                ),
            );
        },
        [],
    );

    const duplicateUser = React.useCallback(
        (id: GridRowId) => () => {
            setRows((prevRows) => {
                const rowToDuplicate = prevRows.find((row) => row.id === id)!;
                return [...prevRows, { ...rowToDuplicate, id: Date.now() }];
            });
        },
        [],
    );

    const columns = React.useMemo<GridColDef<Row>[]>(
        () => [
            { field: 'roleName', type: 'string' ,},
            { field: 'roleLevel', type: 'number' ,},
            { field: 'descript', type: 'string', width: 180 , },
            { field: 'updateTime', type: 'string', width: 180  ,},
            { field: 'operator', type: 'string', width: 180  ,},
            { field: 'isAdmin', type: 'boolean', width: 120  ,},
            {
                field: 'country',
                type: 'singleSelect',
                width: 120,
                valueOptions: [
                    'Bulgaria',
                    'Netherlands',
                    'France',
                    'United Kingdom',
                    'Spain',
                    'Brazil',
                ],

            },
            {
                field: 'discount',
                type: 'singleSelect',
                width: 120,
                valueOptions: ({ row }) => {
                    if (row === undefined) {
                        return ['EU-resident', 'junior'];
                    }
                    const options: string[] = [];
                    if (!['United Kingdom', 'Brazil'].includes(row.country)) {
                        options.push('EU-resident');
                    }
                    if (row.age < 27) {
                        options.push('junior');
                    }
                    return options;
                },

            },
            {
                field: 'actions',
                type: 'actions',
                width: 80,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={deleteUser(params.id)}
                    />,
                    <GridActionsCellItem
                        icon={<SecurityIcon />}
                        label="Toggle Admin"
                        onClick={toggleAdmin(params.id)}
                        showInMenu
                    />,
                    <GridActionsCellItem
                        icon={<FileCopyIcon />}
                        label="Duplicate User"
                        onClick={duplicateUser(params.id)}
                        showInMenu
                    />,
                ],

            },
        ],
        [deleteUser, toggleAdmin, duplicateUser],
    );
    return (
        <Box sx={{ height:'auto', maxHeight: '100%', minHeight:'300px', width: 'auto' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 15,
                        },
                    },
                }}
                disableColumnFilter
                disableColumnMenu
                disableColumnSorting
                pageSizeOptions={[15]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}