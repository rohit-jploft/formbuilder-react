import { DndProvider } from 'react-dnd';
import { Link, useNavigate } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import React, { useState, useContext, useCallback, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import {
  Card,
  List,
  Button,
  ListItem,
  TextField,
  Typography,
  CardContent,
  ListItemText,
} from '@mui/material';

// import { Box } from '../../components/Box';
import { GlobalContext } from '../../context/GlobalState';
import { FromContainer } from '../../components/FromContainer';
import ModalWithForm from '../../components/ModalWithForm';
import { BASE_URL } from 'src/utils/constant';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  listRoot: {
    width: '100%',
    justify: 'center',
    '& .MuiListItem-root': {
      '&:hover': {
        color: 'orange',
      },
      '&.MuiListItem-divider': {
        border: '2px solid rgba(0,0,0,0.1)',
        marginBottom: '10px',
        padding: '20px',
      },
    },
  },
  subheader: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    fontSize: 5,
    '&.MuiListSubheader-inset': { marginBottom: 12 },
  },
  listItemText: {
    '& .MuiListItemText-primary': {
      fontSize: '1rem',
    },
  },
  listItemSpanText: {
    fontSize: '0.8rem',
  },
}));

export const FormBuilderView = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { addForm } = useContext(GlobalContext);
  const [selectedForm, setSelectedForm] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (id) {
        const res = await axios.get(`${BASE_URL}form/get/${id}`);
        console.log(res.data);
        setSelectedForm({ name: res?.data?.data?.formName, fields: res?.data?.data?.fields });
      }
    })();
  }, []);

  const updateValue = (obj) => setSelectedForm((q) => ({ ...q, ...obj }));
  const DropEnd = useCallback(
    (item) => {
      console.log(item, 'drag end');
      let getFields = selectedForm?.fields || [];
      getFields = [...getFields, item];
      setSelectedForm((q) => ({ ...q, fields: getFields }));
    },
    [selectedForm?.fields]
  );
  // const saveForm = useCallback(() => {
  //   if (selectedForm?.name == null) {
  //     alert('Please enter a form name');
  //     return;
  //   }
  //   const id = Math.floor(Math.random() * 90000) + 10000;
  //   const date = new Date();
  //   const formattedDate = date.toLocaleDateString('en-GB', {
  //     day: 'numeric',
  //     month: 'short',
  //     year: 'numeric',
  //   });
  //   const obj = { id, createdate: formattedDate, ...selectedForm };
  //   addForm(obj);
  //   navigate('/');
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedForm]);
  // console.log(selectedForm, 'form');

  // preview form

  const previewForm = () => {
    if (selectedForm.fields.length > 0) {
      setShowPreview(true);
    } else {
      alert('please add some element to preview');
    }
  };
  const removeField = (indexToRemove) => {
    setSelectedForm((prevForm) => {
      const updatedFields = prevForm.fields.filter((_, index) => index !== indexToRemove);
      return { ...prevForm, fields: updatedFields };
    });
  };
  const saveFormToDb = async () => {
    if (!selectedForm.name) {
      alert('form name is required');
    } else {
      if (id) {
        const data = await axios.put(`${BASE_URL}form/update/${id}`, {
          formName: selectedForm?.name,
          fields: selectedForm.fields,
          noOfFields: selectedForm.fields.length,
        });
        if (data && data.data && data.data.success) {
          navigate('/user');
        } else {
          alert('something went wrong');
        }
      } else {
        const data = await axios.post(`${BASE_URL}form/create`, {
          formName: selectedForm?.name,
          fields: selectedForm.fields,
        });
        if (data && data.data && data.data.success) {
          navigate('/user');
        } else {
          alert('something went wrong');
        }
      }
    }
  };
  return (
    <>
      <Card sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography align="center">
          <CardContent sx={{ marginLeft: '-330px' }}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Form Name"
              type="text"
              variant="standard"
              required
              onChange={({ target: { value = '' } = {} }) => updateValue({ name: value })}
              value={selectedForm?.name || ''}
            />
          </CardContent>
        </Typography>
        <Typography align="center">
          <CardContent>
            <DndProvider backend={HTML5Backend}>
              <FromContainer DropEnd={DropEnd} fields={selectedForm?.fields} formName={selectedForm?.name} remove={(value) => removeField(value)}/>
            </DndProvider>
          </CardContent>
        </Typography>
      </Card>
      {/* <Card>
        <CardContent>
        
          <List className={classes.listRoot}>
            {selectedForm?.fields?.map((item, index) => (
              <ListItem key={index} dense divider>
                <ListItemText
                  id={`checkbox-list-label-${item.id}`}
                  className={classes.listItemText}
                >
                  Field Title: {item.label}
                </ListItemText>
                <ListItemText
                  id={`checkbox-list-label-${item.id}`}
                  className={classes.listItemText}
                >
                  Field Type: {item.name}
                </ListItemText>
                <Button onClick={() => removeField(index)}>Remove</Button>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card> */}
      <Card>
        <Typography align="right">
          <CardContent>
            <Button
              variant="contained"
              style={{ marginRight: '10px' }}
              onClick={() => saveFormToDb()}
            >
              {id ? "Update": "Add"}
            </Button>
            <Button
              variant="contained"
              style={{ marginRight: '10px' }}
              onClick={() => previewForm()}
            >
              Preview
            </Button>
            <Link to="/user">
              <Button variant="contained">Cancel</Button>
            </Link>
          </CardContent>
        </Typography>
      </Card>
      <ModalWithForm
        fields={selectedForm?.fields}
        open={showPreview}
        setOpen={(value) => setShowPreview(value)}
        formName={selectedForm?.name}
      />
    </>
  );
};
