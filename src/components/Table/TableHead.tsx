import { FC } from 'react';

import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  Checkbox,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import { TCell as Cell } from '@utils/types';

interface MuiTableHeadProps {
  isShowCheckAll: boolean;
  checked: boolean;
  order: 'asc' | 'desc';
  orderBy: keyof any;
  cells: Cell[];
  children?: React.ReactNode;
  handleChangeCheck: (checked: boolean) => void;
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
}

const MuiTableHead: FC<MuiTableHeadProps> = ({
  isShowCheckAll,
  checked,
  children,
  order,
  orderBy,
  cells,
  onRequestSort,
  handleChangeCheck,
}: MuiTableHeadProps) => {
  const createSortHandler =
    (property: any) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {isShowCheckAll ? (
          <TableCell align="center" sx={{ background: '#fff', width: 10 }}>
            <Checkbox
              checked={checked}
              onChange={({ target }) => handleChangeCheck(target.checked)}
            />
          </TableCell>
        ) : null}
        {cells.map(({ header, accessor, isRight }) => (
          <TableCell
            key={accessor}
            align={isRight ? 'right' : 'left'}
            padding="normal"
            sx={{ background: '#fff' }}
            sortDirection={orderBy === accessor ? order : false}
          >
            {header && (
              <TableSortLabel
                active={orderBy === accessor}
                direction={orderBy === accessor ? order : 'asc'}
                onClick={createSortHandler(accessor)}
              >
                <Typography variant="h5">{header}</Typography>
                {orderBy === accessor ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
        {children}
      </TableRow>
    </TableHead>
  );
};

export default MuiTableHead;
