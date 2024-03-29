import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        BuyYourBook
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
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
          <Formik
            initialValues={{uname: '', pass: '', remember: ''}}
            validationSchema={Yup.object({
              pass: Yup.string()
                .required('Required'),
              uname: Yup.string().required('Required'),
            })}
            onSubmit={async (values, { resetForm }) => {
              const res = await AuthService.login(values.uname, values.pass);

              if(res === undefined){
                resetForm();
              }
              else{
                navigate('/home', {replace: true});
              }
            }}
          >
            <Form>
              <Field 
                component={TextField}
                margin="normal"
                required
                fullWidth
                id="uname"
                label="Username"
                name="uname"
                autoComplete="username"
                autoFocus  
              />

              <ErrorMessage name='uname'/>

              <Field 
                component={TextField}
                margin="normal"
                required
                fullWidth
                id="pass"
                label="Password"
                name="pass"
                autoComplete="password"
                type="password"
                autoFocus 
              />

              <ErrorMessage name='pass'/>

              <br/>

              <Field
                as={FormControlLabel}
                type="checkbox"
                name="remember"
                control={<Checkbox />}
                label="Remember me"
              />
      
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
                <Grid item>
                    <Link href="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
              </Grid>

            </Form>
          </Formik>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}