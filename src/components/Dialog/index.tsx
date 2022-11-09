import { FC, ReactElement } from 'react';

import {
  Button,
  Dialog as MDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

type DialogProps = {
  open: boolean;
  title?: string;
  content?: ReactElement;
  actions?: ReactElement;
  onSubmit?: () => void;
  onClose: () => void;
};

const Dialog: FC<DialogProps> = ({
  open,
  title,
  content,
  actions,
  onSubmit = () => {},
  onClose,
}: DialogProps) => {
  return (
    <MDialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        {actions ? (
          actions
        ) : (
          <>
            <Button color="primary" onClick={onSubmit}>
              Apply
            </Button>
            <Button color="error" onClick={onClose}>
              Cancel
            </Button>
          </>
        )}
      </DialogActions>
    </MDialog>
  );
};

export default Dialog;
