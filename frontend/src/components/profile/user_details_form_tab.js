import { Button, Card, CardContent, CardHeader, Stack } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import * as Yup from 'yup';
import UserService from "../../services/user.service";

const PlatformInfoForm = (props)=>{
    const userInfo = UserService.getUserData();
    return (
        <Card raised sx={{maxWidth: 'sm'}}>
            <CardHeader 
                title = 'Platform'
            />
            <CardContent>
                <Formik 
                    initialValues={{
                        email: userInfo.email, 
                        username: userInfo.username,
                        old_password: '',
                        new_password: '',
                        retyped: '',
                    }}
                    validationSchema={
                        Yup.object({
                            new_password: Yup.string().required()
                                .min(8, 'Password is too short - should be 8 chars minimum.')
                                .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
                            retyped: Yup.string().required('Retyping new password is required')
                                .oneOf([Yup.ref('new_password'), null], 'Passwords must match'),
                            old_password: Yup.string().required('Old password is required')
                        })
                    }
                    onSubmit={(values, {resetForm})=>{
                        console.log(values);
                        resetForm();
                    }}
                >
                    {
                        formik =>(
                            <Form>
                                <Field 
                                    component={TextField}
                                    margin="normal"
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    disabled
                                />

                                <Field 
                                    component={TextField}
                                    margin="normal"
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    disabled
                                />

                                <Field 
                                    component={TextField}
                                    margin="normal"
                                    fullWidth
                                    type='password'
                                    id="old_password"
                                    label="Old Password"
                                    name="old_password"
                                    autoComplete="password"
                                />

                                <Field 
                                    component={TextField}
                                    margin="normal"
                                    fullWidth
                                    type='password'
                                    id="new_password"
                                    label="New Password"
                                    name="new_password"
                                />

                                <Field 
                                    component={TextField}
                                    margin="normal"
                                    fullWidth
                                    type='password'
                                    id="retyped"
                                    label="Retype New Password"
                                    name="retyped"
                                />

                                <Button
                                    type="submit"
                                    color='primary'
                                    fullWidth
                                    variant="contained"
                                >
                                    Submit
                                </Button>
                            </Form>
                            
                        )
                    }
                </Formik>
            </CardContent>
        </Card>
    )
}

export default function UserDetailsForm(props){
    const userInfo = UserService.getUserData();

    return (
        <Card>
            <PlatformInfoForm/>
            <CardHeader
                title='Personal Information'
            />
            <Formik
                initialValues={{
                    firstname: '', 
                    lastname: '', 
                    streetAddress: '', 
                    district: '', 
                    country: '', 
                    phone: '', 
                    BackupPhoneNo: ''
                }}
                validationSchema={Yup.object({
                    
                })}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values);
                    setSubmitting(false);
                }}
            >
            {formic => (
                <Form>
                    <Field
                        component={TextField}
                        margin="normal"
                        fullWidth
                        id="firstname"
                        label="First Name"
                        name="firstname"
                        autoComplete="given-name"
                    />
                    <ErrorMessage name='firstname'/>

                    <Field
                        component={TextField}
                        margin="normal"
                        fullWidth
                        id="lastname"
                        label="Last Name"
                        name="lastname"
                        autoComplete="family-name"
                    />
                    <ErrorMessage name='lastname'/>

                    <Field
                        component={TextField}
                        margin="normal"
                        fullWidth
                        id="streetAddress"
                        label="Street Address"
                        name="streetAddress"
                        autoComplete="street-address"
                    />
                    <ErrorMessage name='streetAddress'/>

                    <Field
                        component={TextField}
                        margin="normal"
                        fullWidth
                        id="district"
                        label="District"
                        name="district"
                        autoComplete="address-level1"
                    />
                    <ErrorMessage name='district'/>

                    <Field
                        component={TextField}
                        margin="normal"
                        fullWidth
                        id="country"
                        label="Country"
                        name="country"
                        autoComplete="country-name"
                    />
                    <ErrorMessage name='country'/>

                    <Field
                        component={TextField}
                        type="tel"
                        margin="normal"
                        fullWidth
                        id="phone"
                        label="Phone Number"
                        name="phone"
                        autoComplete="tel"
                    />
                    <ErrorMessage name='phone'/>

                    <Field
                        component={TextField}
                        type="tel"
                        margin="normal"
                        fullWidth
                        id="backupPhone"
                        label="Backup Phone Number"
                        name="backupPhoneNo"
                        autoComplete="tel"
                    />
                    <ErrorMessage name='backupPhoneNo'/>

                    <Button
                        type="submit"
                        color='primary'
                        fullWidth
                        variant="contained"
                        onClick={()=> formic.values.checked=true}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>
                </Form>
            )}
          </Formik>
        </Card>
    )
};
