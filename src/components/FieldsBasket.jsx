import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
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
import CloseIconImage from "../assets/cross.png"
import EditIconImage from "../assets/edit.png"
import makeStyles from '@mui/styles/makeStyles';
import { ItemTypes } from './itemTypes';

const modalStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));
const style = {
  border: '1px dashed gray',
  height: 'max-content',
  minHeight:"20rem",
  width: '35rem',
  margin: 'auto',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
};
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
        
        <Button variant="contained" sx={{ margin: '15px', width:"100%" }}>
          {field?.label}
        </Button>
        
       
      );
    case 'Radio Button':
      return (
        <FormControl key={index} component="fieldset">
          <Typography variant="subtitle1">{field.label}</Typography>
          <RadioGroup sx={{ display: 'flex', flexDirection: 'row' }}>
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
export const FieldsBasket = ({ DropEnd, fields, formName, remove }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: (item) => DropEnd(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;
  const Styleobj = isActive ? { ...style, backgroundColor: 'lightyellow' } : style;

  const classes = modalStyles();
  return (
    <div
      ref={drop}
      style={Styleobj}
     
    >
      {/* {isActive ? "" : "Drag a form element here"} */}
      {fields?.length > 0 && (
        <Grid container spacing={2}>
          {fields?.map((field, index) => {
            return (
              <Grid item xs={12} key={index} sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                {renderField(field, index)}
                {/* <CloseIcon sx={{margin:"6px", cursor:"pointer"}} onClick={() => remove(index)}/> */}
                <img src={EditIconImage} style={{margin:"6px", cursor:"pointer", height:"15px", width:"15px"}} />
                <img src={CloseIconImage} style={{margin:"6px", cursor:"pointer", height:"20px", width:"20px"}} onClick={() => remove(index)}/>
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
};
FieldsBasket.propTypes = {
  DropEnd: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
  formName: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
};
