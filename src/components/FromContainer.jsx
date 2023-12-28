/* eslint-disable */

import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
  Dialog,
  Button,
  Checkbox,
  TextField,
  FormGroup,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
} from '@mui/material';

import { Box } from './Box';
import { FieldsBasket } from './FieldsBasket';
import { eleList, ElementList } from '../utils/elementList';
import TagInput from './TagInput';
// import { FieldOptionModal } from './FieldOptionModal';

export const FromContainer = ({ DropEnd, fields, formName , remove}) => {
  const modalobj = { open: false, title: '' };
  const [modalData, setNodalData] = useState(modalobj);
  const [lastDropped, setLastDropped] = useState();
  const [options, setOptions] = useState([])
  const { open, title = '', placeholder = '', label = ''} = modalData;
  const handleClose = () => setNodalData((q) => ({ ...q, open: false }));
  const updateDataOnDragend = (item) => {
    console.log('before last dropped', item);
    setLastDropped(item);
    setNodalData((q) => ({ ...q, open: true, ...item }));
  };
  const handleAdd = () => {
    
    if(options.length > 0 && eleList.checkbox === modalobj.name || eleList.dropDown === modalobj.name || eleList.radioButton === modalobj.name ){
        // modalobj.options = options;
        // modalData.options = options;
        setNodalData({...modalobj, options});
        
    }
    DropEnd({...modalData, options});
    handleClose()
    setNodalData(modalobj)
    
    
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div
          style={{ overflow: 'hidden', clear: 'both', display: 'flex', flexDirection: 'column' }}
        >
          {ElementList.map((item) => (
            <Box
              name={item}
              show={updateDataOnDragend}
              setLastDropped={(value) => setLastDropped(value)}
            />
          ))}

          {/* <Box name="DatePicker" show={updateDataOnDragend} /> */}
        </div>
        <div style={{ overflow: 'hidden', clear: 'both', marginLeft: '200px', width: 'max-content' }}>
          <FieldsBasket DropEnd={updateDataOnDragend} fields={fields} formName={formName} remove={(value) => remove(value)}/>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Field</DialogTitle>
        <DialogContent>
          {lastDropped?.name !== eleList.button && (
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Field key"
              type="text"
              fullWidth
              value={title || ''}
              variant="standard"
              onChange={({ target: { value = '' } = {} }) => {
                const newValue = value.replace(/\s/g, ''); // Remove spaces from the input value
                setNodalData((q) => ({ ...q, title: newValue }));
              }}
             
            />
          )}
          
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Field Label"
            type="text"
            fullWidth
            value={label || ''}
            variant="standard"
            onChange={({ target: { value = '' } = {} }) =>
              setNodalData((q) => ({ ...q, label: value }))
            }
          />

          {lastDropped?.name === eleList.textArea && (
            <TextField
              autoFocus
              margin="dense"
              id="label"
              label="Field Placeholder"
              type="text"
              fullWidth
              value={placeholder || ''}
              variant="standard"
              onChange={({ target: { value = '' } = {} }) =>
                setNodalData((q) => ({ ...q, placeholder: value }))
              }
            />
          )}
          {lastDropped?.name === eleList.dropDown && <TagInput tags={options} setTags={(value) => setOptions(value)}/>}
          {lastDropped?.name === eleList.checkbox && <TagInput tags={options} setTags={(value) => setOptions(value)}/>}
          {lastDropped?.name === eleList.radioButton && <TagInput tags={options} setTags={(value) => setOptions(value)}/>}
          {lastDropped?.name === eleList.textField && (
            <TextField
              autoFocus
              required
              margin="dense"
              id="label"
              label="Field Placeholder"
              type="text"
              fullWidth
              value={placeholder || ''}
              variant="standard"
              onChange={({ target: { value = '' } = {} }) =>
                setNodalData((q) => ({ ...q, placeholder: value }))
              }
            />
          )}
          {/* {lastDropped?.name !== eleList.button && (
            <FormGroup>
              <FormControlLabel
                control={<Checkbox value={isRequired}  />}
                label="Field Required"
                onChange={({ target: { value = '' } = {} }) =>
                setNodalData((q) => ({ ...q, isRequired: value }))
              }
                
              />
            </FormGroup>
          )} */}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
      {/* <FieldOptionModal handleAdd={handleAdd} handleClose={handleClose} open={open} modalData={modalData} lastDropped={lastDropped} setNodalData={(value) => setNodalData(value) }/> */}
    </>
  );
};
FromContainer.propTypes = {
  DropEnd: PropTypes.func.isRequired, // Adjust the PropTypes according to your specific needs
};
export default FromContainer;
