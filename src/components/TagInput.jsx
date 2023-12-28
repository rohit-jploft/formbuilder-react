import React, { useState } from 'react';
import {
  Chip,
  TextField,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom:"10px",
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const TagInput = ({tags, setTags}) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  // const [tags, setTags] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleDelete = (tagToDelete) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <div>
      <TextField
        label="Add Options"
        variant="standard"
        fullWidth
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className={classes.root}>
        {tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => handleDelete(tag)}
            color="primary"
          />
        ))}
      </div>
    </div>
  );
};

export default TagInput;
