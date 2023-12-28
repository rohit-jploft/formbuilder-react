import React from 'react';

import {
  Dialog,
  Checkbox,
  TextField,
  FormControlLabel,
  FormGroup,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

export const FieldOptionModal = ({ open, handleClose, handleAdd , setNodalData, modalData, lastDropped}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Field</DialogTitle>
      {console.log(lastDropped, 'before render model')}
      {lastDropped?.name === eleList.textField && (
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Field Label"
            type="text"
            fullWidth
            // value={title || ''}
            variant="standard"
            onChange={({ target: { value = '' } = {} }) =>
              setNodalData((q) => ({ ...q, title: value }))
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="label"
            label="Field name"
            type="text"
            fullWidth
            // value={title || ''}
            variant="standard"
            onChange={({ target: { value = '' } = {} }) =>
              setNodalData((q) => ({ ...q, title: value }))
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="label"
            label="Field Placeholder"
            type="text"
            fullWidth
            // value={title || ''}
            variant="standard"
            onChange={({ target: { value = '' } = {} }) =>
              setNodalData((q) => ({ ...q, title: value }))
            }
          />
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Field RequiredF" />
          </FormGroup>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};
