import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import { Alert } from '@mui/material';
import { AuthService } from 'services/auth/authService';
import { setToken } from 'redux/useToken';
import { PAGE } from 'components/constants';
import { setCurrentPage } from 'redux/appSlice';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Ads management
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();


const initialFields = {
  username: '',
  password: '',
};

const SignIn = () => {
  const { token } = useSelector((state) => state.appState);
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state) => state.appState);
  const navigate = useNavigate();

  const [fields, setFields] = useState(initialFields);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await AuthService.login(fields);
      if (res.status === 200) {
       
        dispatch(setToken(res.data));
       
        dispatch(setCurrentPage(PAGE.HOME));
       
        navigate(PAGE.HOME.path, { replace: true });
      } else {
        setMessage('Error: ' + res.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response?.data?.message) {
          setMessage('Error: ' + error.response.data.message);
        } else {
          setMessage(error.code );
        }
      }
    } finally {
      setFields(initialFields);
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" id="AuthForm" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="email"
              value={fields.username}
              onChange={handleFieldChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={fields.password}
              onChange={handleFieldChange}
            />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            {message ? (
              <>
                <Alert variant="outlined" severity="error">
                  {message}
                </Alert>
              </>
            ) : (
              <h1>Enter username and password</h1>
            )}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
