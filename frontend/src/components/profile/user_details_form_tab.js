import { Button, Card, CardContent, CardHeader, CardMedia, Grid, Stack } from "@mui/material";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useState } from "react";
import * as Yup from 'yup';
import ImageService from "../../services/image.service";
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

const PersonalInfoForm = (props)=>{
    return (
        <Card raised >
            <CardHeader 
                title = 'Personal Info'
            />
            <CardContent>
                <Formik 
                    initialValues={{
                        firstname: '', 
                        middlename: '',
                        lastname: '',
                        phone: '', 
                        backupPhoneNo: ''
                    }}
                    validationSchema={
                        Yup.object({
                            firstname: Yup.string().required('First name is required'), 
                            middlename: Yup.string(),
                            lastname: Yup.string().required('First name is required'),
                            phone: Yup.string().required(), 
                            backupPhoneNo: Yup.string()
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
                                    id="firstname"
                                    label="First Name"
                                    name="firstname"
                                    autoComplete="given-name"
                                />

                                <Field
                                    component={TextField}
                                    margin="normal"
                                    fullWidth
                                    id="middlename"
                                    label="Middle name"
                                    name="middlename"
                                    autoComplete="additional-name"
                                />

                                <Field
                                    component={TextField}
                                    margin="normal"
                                    fullWidth
                                    id="lastname"
                                    label="Last Name"
                                    name="lastname"
                                    autoComplete="family-name"
                                />


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

const ProfileForm = (props)=>{
    const userInfo = UserService.getUserData();
    const [curImage, setCurImage] = useState(userInfo.image);

    return (
        <Card raised>
            <CardHeader titile='Profile'/>
            <CardContent>
                <Formik
                    initialValues={{
                        uploaded: true,
                        image: userInfo.image,
                        imgList: [userInfo.image]
                    }}
                    validationSchema={
                        Yup.object({
                            image: Yup.string(),
                        })
                    }

                    onSubmit={(values)=>{
                        if(curImage !== userInfo.image){
                            // send to backend
                        }
                    }}

                    >
                    {(formik) =>(
                        <Form>
                            <CardMedia
                                component="img"
                                image={curImage}
                                alt="Live from space album cover"
                            />
                            
                            <Stack direction='row' spacing={2} sx={{ mt: 3, mb: 2 }}>
                                <Button
                                    variant="contained"
                                    component="label"
                                    fullWidth
                                >
                                    Change
                                    <input
                                    type="file"
                                    hidden
                                    onChange={async (event)=>{
                                        //formik.setFieldValue('image', event.target.files[0]);
                                        formik.setFieldValue('uploaded', false);
                                        let data = await ImageService.uploadImage(event.target.files[0]);
                                        let img = data.data.display_url;
                                        setCurImage(img);
                                      }}
                                    />
                                </Button>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    fullWidth
                                    disabled={formik.values.uploaded === true}
                                >
                                    Submit
                                </Button>
                            </Stack>
                            
                      </Form>
                    )}

                </Formik>
            </CardContent>
        </Card>
    );
}

export default function UserDetailsForm(props){
    const userInfo = UserService.getUserData();

    return (
        <Card>
            <Grid
                container
                spacing={3}
            >
                <Grid
                    item
                    lg={6}
                    sm={6}
                    xl={6}
                    xs={12}
                >
                    <PlatformInfoForm/>
                </Grid>

                <Grid
                    item
                    lg={6}
                    sm={6}
                    xl={6}
                    xs={12}
                >
                    <PersonalInfoForm/>
                </Grid>

                <Grid
                    item
                    lg={6}
                    sm={6}
                    xl={6}
                    xs={12}
                >
                    <ProfileForm/>
                </Grid>
          </Grid>
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
