/* eslint-disable */
import React, { useState } from 'react';

import {
  Modal,
  Box,
  Typography,
  Grid,
  TextField,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
const modalStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffffff',
    boxShadow: 24,
    padding: theme.spacing(2, 4, 3),
    p: 4,
    outline: 'none',
    maxHeight: '70%', // Adjust this value to set the maximum height of the modal
    overflowY: 'auto', // Enable vertical scrolling
    borderRadius: '8px',
  },
  scrollableModal: {
    overflowY: 'auto', // Ensure the entire modal is scrollable
  },
  modalContent: {
    paddingTop: '20px', // Adjust padding as needed
  },
}));

// const fields = [
//   {
//     label: 'Name',
//     type: 'Text',
//     placeholder: 'Enter your name',
//     title: 'Name',
//   },
//   {
//     label: 'Description',
//     type: 'Multi Line',
//     placeholder: 'Enter your profile description',
//     title: 'Description',
//   },
//   {
//     label: 'Agree to Terms',
//     type: 'Checkbox',
//     labelPlacement: 'end',
//   },
//   {
//     label: 'Select Option',
//     type: 'Dropdown',
//     options: ['Option 1', 'Option 2', 'Option 3'],
//   },
//   {
//     label: 'Choose One',
//     type: 'Radio Button',
//     options: ['Option A', 'Option B', 'Option C'],
//   },
// ];

const renderField = (field, index) => {
  switch (field.name) {
    case 'Text':
    case 'Multi Line':
      return (
        <TextField
          key={index}
          label={field.label}
          fullWidth
          multiline={field.name === 'Multi Line'}
          rows={field.name === 'Multi Line' ? 4 : 1}
          placeholder={field.placeholder}
          variant="outlined"
          margin="normal"
        />
      );
    case 'Checkbox':
      return (
        <div key={index}>
          <Typography variant="subtitle1">{field.label}</Typography>
          {field.options.map((option, idx) => (
            <FormControlLabel key={idx} control={<Checkbox />} label={option} />
          ))}
        </div>
      );
    case 'Dropdown':
      return (
        <FormControl key={index} fullWidth>
          <InputLabel>{field.label}</InputLabel>
          <Select variant="outlined">
            {field.options.map((option, idx) => (
              <MenuItem key={idx} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    case 'Button':
      return (
        <Button variant="contained"  sx={{ margin: '15px', width:"-webkit-fill-available" }}>
          {field?.label}
        </Button>
      );
    case 'Radio Button':
      return (
        <FormControl key={index} component="fieldset">
          <Typography variant="subtitle1">{field.label}</Typography>
          <RadioGroup sx={{display:"flex", flexDirection:"row"}}>
            {field.options.map((option, idx) => (
              <FormControlLabel key={idx} value={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
        </FormControl>
      );
    default:
      return null;
  }
};

const ModalWithForm = ({ fields, open, setOpen, formName }) => {
  //   const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = modalStyles();

  return (
    <div>
      {/* <Button variant="contained" color="primary" onClick={handleOpen}>
        Open Modal
      </Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
       
      >
        <Box className={`${classes.paper} ${classes.scrollableModal}`}>
          <Typography variant="h6" id="modal-title">
            {formName}
          </Typography>
          <Grid container spacing={2}>
            {fields?.map((field, index) => {
              return (
                <Grid item xs={12} key={index}>
                  {renderField(field, index)}
                </Grid>
              );
            })}
          </Grid>
          {/* <Button variant="contained" color="primary" onClick={handleClose}>
            Close
          </Button> */}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalWithForm;
