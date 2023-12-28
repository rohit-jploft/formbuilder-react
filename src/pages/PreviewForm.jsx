import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';

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
import { useFormik } from 'formik';
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
    marginTop: '50px',
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
  if (!fields) {
    return null; // or a loading spinner
  }
  console.log('fields', fields);
  const classes = modalStyles();
  const initialValues = {};
  fields.forEach((field) => {
    if (field.title) {
      initialValues[field.title] = '';
    }
  });
  console.log(initialValues, 'initial values');
  const validationSchema = Yup.object().shape(
    fields.reduce((obj, field) => {
      obj[field.title] = Yup.string().required(`${field?.title} is required`);
      return obj;
    }, {})
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const renderField = (field, index) => {
    switch (field.name) {
      case 'Text':
      case 'Multi Line':
        return (
          <TextField
            key={index}
            name={field?.title}
            label={field.label}
            onChange={formik.handleChange}
            fullWidth
            multiline={field.name === 'Multi Line'}
            rows={field.name === 'Multi Line' ? 4 : 1}
            placeholder={field.placeholder}
            variant="outlined"
            margin="normal"
            error={formik.touched[field?.title] && Boolean(formik.errors[field?.title])}
            helperText={formik.touched[field?.title] && formik.errors[field?.title]}
          />
        );
      case 'Checkbox':
        return (
          <div key={index}>
            <Typography variant="subtitle1">{field.label}</Typography>
            {field.options.map((option, idx) => (
              <FormControlLabel
                onChange={formik.handleChange}
                name={field?.title}
                key={idx}
                control={<Checkbox />}
                label={option}
                
              />
            ))}
          </div>
        );
      case 'Dropdown':
        return (
          <FormControl
            key={index}
            fullWidth
            
          >
            <InputLabel>{field.label}</InputLabel>
            <Select variant="outlined" name={field?.title} value={formik.values[field?.title]}
            onChange={formik.handleChange}>
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
          <Button variant="contained" sx={{ margin: '15px', width: '100%' }} type='submit'>
            {field?.label}
          </Button>
        );
      case 'Radio Button':
        return (
          <FormControl key={index} component="fieldset" onChange={formik.handleChange}>
            <Typography variant="subtitle1">{field.label}</Typography>
            <RadioGroup sx={{ display: 'flex', flexDirection: 'row' }} name={field?.title}>
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

  return (
    <>
      <Helmet>
        <title> Form Builder </title>
      </Helmet>
      <Box className={classes.paper}>
        <Typography variant="h6" id="modal-title">
          {formName}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {fields?.map((field, index) => {
              return (
                <Grid item xs={12} key={index}>
                  {renderField(field, index)}
                  {formik.touched[field.title] && Boolean(formik.errors[field.title]) && (
                    <span style={{ color: 'red', fontSize: '14px' }}>
                      {formik.touched[field.title] && formik.errors[field.title]}
                    </span>
                  )}
                </Grid>
              );
            })}
          </Grid>
        </form>
      </Box>
    </>
  );
}
