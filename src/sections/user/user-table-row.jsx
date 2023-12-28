import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { BASE_URL } from 'src/utils/constant';
// ----------------------------------------------------------------------

export default function UserTableRow({
  key,
  selected,
  name,
  
  avatarUrl,
  noOfFields,
  createdAt,
  isVerified,
  status,
  handleClick,
  updatedAt,
  row,
  setFormDeleted
}) {
  console.log(row._id, "key")
  const [open, setOpen] = useState(null);
  const navigate = useNavigate()
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const deleteForm = async (id) => {
      const del = await axios.delete(`${BASE_URL}form/delete/${id}`)
      setFormDeleted(true)
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{noOfFields}</TableCell>

        <TableCell>{createdAt}</TableCell>

        <TableCell align="center">{updatedAt}</TableCell>

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={() => navigate(`/edit-form/${row._id}`)}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => navigate(`/form/preview/${row._id}`)}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Preview
        </MenuItem>

        <MenuItem onClick={() => deleteForm(row._id)} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  noOfFields: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  key:PropTypes.any,
  name: PropTypes.any,
  createdAt: PropTypes.any,
  selected: PropTypes.any,
  setFormDeleted: PropTypes.any,
  status: PropTypes.string,
};
