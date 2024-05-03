'use client';

import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import './DataTable.scss';
import ActionBtn from '../ActionBtn';
import { MdDelete } from 'react-icons/md';
import {
  BANNER,
  BRAND,
  CATEGORY,
  ORDER,
  SUCCESS_STATUS,
} from '@/constant/commonConstant';
import { ReactNode } from 'react';
import orderApi from '@/apis/orderApi';

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  editBtn: (data: any) => ReactNode;
};

const DataTable = (props: Props) => {
  const { editBtn } = props;

  const handleDelete = async (id: string) => {
    let response;
    switch (props.slug) {
      case ORDER:
        // response = await orderApi.delete(id);
        break;

      default:
        console.log('invalid value');
    }
    console.log('first', response);
    // if (response.status === SUCCESS_STATUS) {
    //   window.location.reload();
    // }
  };

  const actionColumn: GridColDef = {
    field: 'action',
    headerName: 'Action',
    width: 150,
    renderCell: (param) => {
      return (
        <div className="flex justify-between gap-4 w-full">
          {editBtn(param.row.id)}
          <ActionBtn
            icon={MdDelete}
            onClick={() => handleDelete(param.row.id)}
          />
        </div>
      );
    },
  };

  return (
    <div>
      <DataGrid
        className="bg-white p-5"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
