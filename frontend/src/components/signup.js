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

export default function SignUp() {

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
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                acceptedTerms: false, // added for our checkbox
                emailUpdate: false, // added for our checkbox
                pass: '', // added for our select
              }}
            validationSchema={Yup.object({
                pass: Yup.string().required('Required'),
                firstName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
                lastName: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
                email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
                acceptedTerms: Yup.boolean()
                .required('Required')
                .oneOf([true], 'You must accept the terms and conditions.'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              setSubmitting(false);
            }}
          >
            <Form>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Field 
                            component={TextField}
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            autoComplete="given-name"
                            autoFocus  
                        />
                        <ErrorMessage name='firstName' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Field 
                            component={TextField}
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="family-name"
                            autoFocus  
                        />
                        <ErrorMessage name='lastName' />
                    </Grid>
                    <Grid item xs={12}>
                        <Field 
                            component={TextField}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus  
                        />
                        <ErrorMessage name='email' />
                    </Grid>
                    <Grid item xs={12}>
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
                        <ErrorMessage name='password' />
                    </Grid>
                    <Grid item xs={12} alignItems='flex-start' >
                        <Field
                            as={FormControlLabel}
                            type="checkbox"
                            name="acceptedTerms"
                            control={<Checkbox />}
                            label="Accept terms and conditions"
                        />      
                        <ErrorMessage name='acceptedTerms' />
                    </Grid>
                    <Grid item xs={12} alignItems='flex-start'>
                        <Field
                            as={FormControlLabel}
                            type="checkbox"
                            name="emailUpdate"
                            control={<Checkbox />}
                            label="Recieve email update"
                        />      
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>

                <Grid container justifyContent='flex-end'>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {"Already have an account? Sign in"}
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

