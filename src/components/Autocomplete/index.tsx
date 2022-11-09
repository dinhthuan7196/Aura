import { FC } from 'react';

import { Autocomplete as MAutocomplete, TextField } from '@mui/material';

export type option = {
  label: string | undefined;
  value: string;
};

export type selectedOption = option | option[] | null | undefined;

type AutocompleteProps = {
  options: option[];
  value: selectedOption;
  onChange: (selected: selectedOption) => void;
  label?: string;
  disabled?: boolean;
  multiple?: boolean;
  optionsDisabled?: string[];
};

const Autocomplete: FC<AutocompleteProps> = ({
  value,
  options,
  label,
  multiple,
  disabled,
  optionsDisabled = [],
  onChange,
}: AutocompleteProps) => {
  return (
    <MAutocomplete
      fullWidth
      disablePortal
      disabled={disabled}
      multiple={multiple}
      options={options}
      value={value}
      getOptionLabel={(option) => option?.label ?? ''}
      getOptionDisabled={(option: option) =>
        optionsDisabled.includes(option.value)
      }
      isOptionEqualToValue={(option: option, value: option) =>
        option.value === value.value
      }
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={(event: any, newValue: selectedOption) => {
        onChange(newValue);
      }}
    />
  );
};

export default Autocomplete;
