import React, {
  FC,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactElement,
  ReactNode,
} from 'react';
import styled, { css } from 'styled-components';
import { size, cloneDeep } from 'lodash';

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Button,
  Checkbox,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Close as CancelIcon,
  Check as SaveIcon,
} from '@mui/icons-material';

import Dialog from '@components/Dialog';

import { TCell as Cell, pagination, objProps, method } from '@utils/types';

import { getComparator, stableSort } from './helpers';
import TableHead from './TableHead';
import RenderTableCell from './RenderTableCell';

type ActionsRow = {
  edit?: boolean;
  delete?: boolean;
  view?: boolean;
  create?: boolean;
};

type CreateFormProps = {
  edit?: boolean;
  delete?: boolean;
  view?: boolean;
  create?: boolean;
};

type MuiTableProps = {
  rows?: objProps[];
  columns?: Cell[];
  total?: number;
  width?: any;
  loading?: boolean;
  actions?: ActionsRow;
  CreateForm?: (
    onSubmit: (values: objProps) => void,
    onClose: () => void
  ) => JSX.Element;
  fetchData?: (data?: any) => Promise<void> | void;
  onActions?: (data: any) => Promise<void> | void;
};

type ConfirmProps = {
  title: string;
  content: ReactElement;
  onClose: () => void;
  onSubmit: () => void;
};

const StylesIcon = css`
  cursor: pointer;
  margin-left: 15px;
`;
const MDelete = styled(DeleteIcon)`
  ${StylesIcon}
`;
const MEdit = styled(EditIcon)`
  ${StylesIcon}
`;
const MCancel = styled(CancelIcon)`
  ${StylesIcon}
`;
const MSave = styled(SaveIcon)`
  ${StylesIcon}
`;

const MuiTable: FC<MuiTableProps> = ({
  rows = [],
  columns = [],
  total = 0,
  loading = false,
  width = '100%',
  actions,
  CreateForm,
  fetchData,
  onActions,
}: MuiTableProps) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof any>('id');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [openDialog, setOpenDialog] = useState<ConfirmProps | null>(null);
  const [initialData, setInitialData] = useState<any>([]);
  const [deleteList, setDeleteList] = useState<any[]>([]);

  const handleFetchData = useCallback(
    (payload: pagination) => {
      if (fetchData) fetchData(payload);
    },
    [fetchData]
  );

  const handleActionsData = async (list: objProps[], method: method) => {
    if (onActions) {
      await onActions({ list, method });
      await handleFetchData({
        offset: page,
        posts_per_page: rowsPerPage,
      });
    }
  };

  const handleDeleteRows = (selected: any[]) => {
    setOpenDialog({
      title: 'Delete Data',
      content: <p>Do you want to delete selected data ?</p>,
      onSubmit: async () => {
        await handleActionsData(selected, 'delete');
        setOpenDialog(null);
      },
      onClose: () => setOpenDialog(null),
    });
  };

  useEffect(() => {
    setInitialData(rows);
  }, [rows]);

  useEffect(() => {
    handleFetchData({
      offset: page,
      posts_per_page: rowsPerPage,
    });
  }, [page, rowsPerPage, handleFetchData]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof any
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSetFlagEditRow = (row: objProps) => {
    const newData = cloneDeep(initialData).map((record: objProps) => {
      const newRecord = record;
      if (newRecord.id === row.id) {
        newRecord.isEdit = true;
      }
      return newRecord;
    });
    setInitialData(newData);
  };

  const renderEditButtons = (row: objProps, index: number) => {
    return (
      <TableCell key={`actions-${index}`}>
        <MSave
          color="info"
          key={`save-${row.id}-${index}`}
          onClick={() => {
            const updated = initialData.find(
              ({ id }: objProps) => id === row.id
            );
            delete updated.isEdit;
            setOpenDialog({
              title: 'Update Data',
              content: <p>Do you want to update data ?</p>,
              onSubmit: async () => {
                await handleActionsData([updated], 'edit');
                setOpenDialog(null);
              },
              onClose: () => setOpenDialog(null),
            });
          }}
        />
        <MCancel
          color="warning"
          key={`cancel-${row.id}-${index}`}
          onClick={() => {
            setInitialData([
              ...initialData.filter(({ id }: objProps) => id !== row.id),
              rows.find(({ id }: objProps) => id === row.id),
            ]);
          }}
        />
      </TableCell>
    );
  };

  const renderActions = (
    key: string | undefined,
    row: objProps,
    index: number
  ) => {
    switch (key) {
      case 'edit':
        return (
          <MEdit
            color="primary"
            key={`${key}-${index}`}
            onClick={() => handleSetFlagEditRow(row)}
          />
        );
      case 'delete':
        return (
          <MDelete
            color="error"
            key={`${key}-${index}`}
            onClick={() => handleDeleteRows([row.id])}
          />
        );
      default:
        return null;
    }
  };

  const renderRows = useMemo(() => {
    if (loading) {
      return (
        <TableRow tabIndex={-1} key="loading">
          <TableCell align="center" colSpan={size(columns) + (actions ? 1 : 0)}>
            <CircularProgress thickness={3} color="info" />
          </TableCell>
        </TableRow>
      );
    }
    if (!loading && !size(initialData)) {
      return (
        <TableRow tabIndex={-1} key="noDta">
          <TableCell align="center" colSpan={size(columns) + (actions ? 1 : 0)}>
            <Typography variant="h5">No Data</Typography>
          </TableCell>
        </TableRow>
      );
    }
    return stableSort(initialData, getComparator(order, orderBy)).map(
      (row, index) => {
        const isEditRow =
          initialData.find(({ id }: objProps) => id === row.id)?.isEdit ??
          false;
        return (
          <TableRow hover tabIndex={-1} key={index}>
            {actions?.delete ? (
              <TableCell align="center">
                <Checkbox
                  checked={deleteList.includes(row.id)}
                  onChange={({ target }) => {
                    if (!target.checked) {
                      setDeleteList(deleteList.filter((val) => val !== row.id));
                    } else {
                      setDeleteList([...deleteList, row.id]);
                    }
                  }}
                />
              </TableCell>
            ) : null}
            {columns.map((col: Cell, index) => (
              <RenderTableCell
                isEdit={isEditRow}
                key={index}
                column={col}
                row={row}
                onChange={({ id, accessor, value }: objProps) => {
                  const cloned = cloneDeep(initialData).map((elm: objProps) => {
                    if (elm.id !== id) return elm;
                    return {
                      ...elm,
                      [accessor]: value,
                    };
                  });
                  setInitialData(cloned);
                }}
              />
            ))}
            {isEditRow ? (
              renderEditButtons(row, index)
            ) : actions && size(actions) ? (
              <TableCell key={`actions-${index}`}>
                {Object.entries(actions || {}).map(([key, value], index) => {
                  if (!value) return null;
                  return renderActions(key, row, index);
                })}
              </TableCell>
            ) : null}
          </TableRow>
        );
      }
    );
  }, [initialData, loading, order, orderBy, columns, actions, deleteList]);

  const renderConfirm = useMemo(() => {
    if (!openDialog) return null;
    const { title, content, onClose, onSubmit } = openDialog;
    return (
      <Dialog
        open
        title={title}
        content={content}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    );
  }, [openDialog]);

  const renderActionsTable = useMemo(() => {
    if (!actions) return null;
    const { create, delete: tbDelete } = actions;
    return (
      <Box py={5} px={10} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {create ? (
          <Button
            variant="outlined"
            sx={{ width: 100 }}
            onClick={async () => {
              // sadsad
            }}
          >
            Create
          </Button>
        ) : null}
        {tbDelete ? (
          <>
            <Button
              variant="outlined"
              color="warning"
              disabled={!size(deleteList)}
              sx={{ width: 100, marginLeft: 5 }}
              onClick={() => handleDeleteRows(deleteList)}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              color="error"
              disabled={!size(deleteList)}
              sx={{ width: 100, marginLeft: 5 }}
              onClick={() => setDeleteList([])}
            >
              Cancel
            </Button>
          </>
        ) : null}
      </Box>
    );
  }, [actions, deleteList]);

  return (
    <>
      {renderConfirm}
      <Box sx={{ width }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          {renderActionsTable}
          <TableContainer>
            <Table
              stickyHeader
              aria-labelledby="tableTitle"
              size="medium"
              sx={{ minWidth: 750 }}
            >
              <TableHead
                cells={columns}
                order={order}
                orderBy={orderBy}
                isShowCheckAll={actions?.delete ?? false}
                checked={deleteList.length === rows.length}
                handleChangeCheck={(checked: boolean) => {
                  if (checked) {
                    setDeleteList(rows.map(({ id }) => id));
                  } else {
                    setDeleteList([]);
                  }
                }}
                onRequestSort={handleRequestSort}
              >
                {actions && size(actions) && (
                  <TableCell padding="normal" sx={{ background: '#fff' }}>
                    &nbsp;
                  </TableCell>
                )}
              </TableHead>
              <TableBody>{renderRows}</TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            rowsPerPageOptions={[10, 25, 50, 100]}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
};

export default MuiTable;
