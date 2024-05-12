import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

interface DataTableProps {
    columns: GridColDef[];
    rows: GridRowsProp;
    height?: number;
}

const CustomDataGrid: React.FC<DataTableProps> = ({ columns, rows, height }) => {
    

   

    return (
        <div style={{ width: '800px', paddingTop:"4rem"}}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5]}
                getRowClassName={(params) =>
                    params.row.isUpdatable ? '' : 'disable-row'
                }

                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                sx={{ height: height, width: '100%'}}
            />
        </div>
    );
};

export default CustomDataGrid;