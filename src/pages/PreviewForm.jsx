import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
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
import { BASE_URL } from 'src/utils/constant';
// ----------------------------------------------------------------------
const modalStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    marginTop:"50px",
    transform: 'translate(-50%, -50%)',
  },
}));
export default function PreviewForm() {
  const [fields, setFields] = useState([]);
  const [formName, setFormName] = useState('');
  const { formId } = useParams();

  const getFormData = async () => {
    const res = await axios.get(`${BASE_URL}form/get/${formId}`);
    console.log(res, 'single formdata');
    setFields(res?.data?.data?.fields);
    setFormName(res?.data?.data?.formName);
  };
  useEffect(() => {
    getFormData();
  }, []);
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

  const classes = modalStyles();

  return (
    <>
      <Helmet>
        <title> Form Builder </title>
      </Helmet>
      <Box className={classes.paper}>
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
       
      </Box>
    </>
  );
}
