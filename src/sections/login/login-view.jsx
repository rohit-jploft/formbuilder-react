import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'src/routes/hooks';
import {useNavigate} from "react-router-dom"
import { bgGradient } from 'src/theme/css';
import * as Yup from 'yup'; // Import Yup for validation
import { useFormik } from 'formik';
import Iconify from 'src/components/iconify';
import axios from 'axios';
import { BASE_URL } from 'src/utils/constant';
// ----------------------------------------------------------------------
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});
export default function LoginView() {
  const theme = useTheme();
  const navigate = useNavigate()
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      const res = await axios.post(`${BASE_URL}login`, {
        email: formik.values.email,
        password: formik.values.password,
      });
      if (res?.data && res.data?.data?.token) {
        const token = res.data?.data?.token;
        localStorage.setItem("token", token)
        localStorage.setItem("userId", res.data?.data?.user?._id)
        navigate("/")
      }
      if (res?.data && res?.data?.type === 'error') {
        toast(res.data.message, { type: 'error' });
      }
    },
  });
  const renderForm = (
    <>
      <Stack spacing={3}>
        <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            label="Email *"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          </Stack>

          {/* <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            
          >
            Login
          </LoadingButton>
        </form>
      </Stack>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      {/* <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      /> */}

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
