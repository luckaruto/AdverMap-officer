import * as React from 'react';
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
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {AuthService} from "../../services/auth/authService.tsx";
import {AxiosError} from "axios";
import {PAGE} from "../constants.tsx";
import {Alert} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setToken} from "../../redux/useToken.tsx";
import {setCurrentPage} from "../../redux/currentPage.tsx";

function Copyright(props: any) {
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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export type AuthFieldForm = {
    username: string;
    password: string;
};

const initialFields: AuthFieldForm = {
    username: '',
    password: '',
};

const SignIn = ( ) => {
    const {token} = useSelector(state => state.token);
    const dispatch = useDispatch();
    const {currentPage} = useSelector(state => state.currentPage);
    const navigate = useNavigate();

    const [fields, setFields] = useState(initialFields)
    const [message,setMessage]=useState<string>("")
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            navigate(PAGE.HOME.path, {replace:true});
            dispatch(setCurrentPage(PAGE.HOME));
            // const res = await AuthService.login(fields);
            // if (res.status == 200) {
            //     dispatch(setToken(res.data));

            // } else {
            //     setMessage("Error: " + res.message)
            // }

        } catch (error) {
            if (error instanceof AxiosError) {
                if (error?.response?.data?.message) {
                    setMessage("Error: " + error.response.data.message)
                } else {
                    setMessage(error.code as string)
                }
            }
        }
        finally{
            setFields(initialFields)
        }
    };

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                    <Box component="form"  id="AuthForm" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        {message ? (
                            <>
                                <Alert variant="outlined" severity="error">
                                    {message}
                                </Alert>
                            </>

                        ) : (
                            <h1>Enter usename and password</h1>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    )
}

export default SignIn;