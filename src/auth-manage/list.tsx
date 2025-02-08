import * as React from 'react';
import Box from '@mui/material/Box';
import {
    DataGrid,
    GridActionsCellItem,
    GridRowId,
    GridColDef,
    GridActionsCellItemProps,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const initialRows = [
    {
        id: 1,
        name: 'Damien',
        age: 25,
        dateCreated: '2024-04-01 00:00:00',
        lastLogin: '2024-04-01 00:00:00',
        isAdmin: true,
        country: 'Spain',
        discount: '',
    },
    {
        id: 2,
        name: 'Nicolas',
        age: 36,
        dateCreated: '2024-04-01 00:00:00',
        lastLogin: '2024-04-01 00:00:00',
        isAdmin: false,
        country: 'France',
        discount: '',
    },
    {
        id: 3,
        name: 'Kate',
        age: 19,
        dateCreated: '2024-04-01 00:00:00',
        lastLogin: '2024-04-01 00:00:00',
        isAdmin: false,
        country: 'Brazil',
        discount: 'junior',
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
            { field: 'name', type: 'string' ,disableColumnFilter: true, disableColumnMenu: true, disableColumnSorting: true},
            { field: 'age', type: 'number' ,disableColumnFilter: true, disableColumnMenu: true, disableColumnSorting: true},
            { field: 'dateCreated', type: 'string', width: 180 ,disableColumnFilter: true, disableColumnMenu: true, disableColumnSorting: true },
            { field: 'lastLogin', type: 'string', width: 180  ,disableColumnFilter: true, disableColumnMenu: true, disableColumnSorting: true},
            { field: 'isAdmin', type: 'boolean', width: 120  ,disableColumnFilter: true, disableColumnMenu: true, disableColumnSorting: true},
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
                disableColumnFilter: true, disableColumnMenu: true, disableColumnSorting: true
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
                disableColumnFilter: true, disableColumnMenu: true, disableColumnSorting: true
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
                disableColumnFilter: true, disableColumnMenu: true, disableColumnSorting: true
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
                pageSizeOptions={[15]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}