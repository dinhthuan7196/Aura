import { FC } from 'react';

import AutoComplete from '@components/Autocomplete';

import { TableCell, TextField, Checkbox } from '@mui/material';
import { MobileDatePicker as DatePicker } from '@mui/lab';

import { TCell, objProps } from '@utils/types';
import {
  convertTimeStampToDate,
  convertDateToTimeStamp,
  formatNumber,
} from '@utils/helpers';

type CellProps = {
  column: TCell;
  row: objProps;
  onChange: (values: any) => void;
  isEdit?: boolean;
};

const renderValue = (
  value: string | number | undefined,
  type: string | undefined
) => {
  switch (type) {
    case 'number':
      return formatNumber(value);
    case 'date':
      return convertTimeStampToDate(value, 'dd/MM/yyyy');
    default:
      return value;
  }
};

const renderEditCell = ({ row, column, onChange }: CellProps) => {
  const { type, options, accessor } = column;
  const id = row.id;
  const value = row[accessor];

  switch (type) {
    case 'number':
      return (
        <TextField
          fullWidth
          type="number"
          value={value}
          onChange={({ target }) =>
            onChange({
              id,
              accessor,
              value: target.value,
            })
          }
        />
      );
    case 'select':
      return (
        <AutoComplete
          options={options}
          value={options.find((opt: objProps) => opt.value === value)}
          onChange={(opt: any) => {
            onChange({
              id,
              accessor,
              value: opt.value,
            });
          }}
        />
      );
    case 'checkbox':
      return (
        <Checkbox
          checked={value}
          onChange={({ target }) =>
            onChange({ id, accessor, value: target.checked })
          }
        />
      );
    case 'date':
      return (
        <DatePicker
          inputFormat="dd/MM/yyyy"
          value={convertTimeStampToDate(value)}
          onChange={(value) =>
            onChange({ id, accessor, value: convertDateToTimeStamp(value) })
          }
          renderInput={(params) => <TextField fullWidth {...params} />}
        />
      );
    default:
      return (
        <TextField
          fullWidth
          value={value}
          onChange={({ target }) =>
            onChange({
              id,
              accessor,
              value: target.value,
            })
          }
        />
      );
  }
};

const renderCell = (props: CellProps) => {
  const { isEdit, row, column } = props;
  const { accessor, type, render } = column;

  if (isEdit && !column.disabledEdit) return renderEditCell(props);
  if (render) return render(row);
  return renderValue(row[accessor], type);
};

const RenderTableCell: FC<CellProps> = (props: CellProps) => {
  const { column } = props;
  const { isRight } = column;
  return (
    <TableCell align={isRight ? 'right' : 'left'}>
      {renderCell(props)}
    </TableCell>
  );
};

export default RenderTableCell;
