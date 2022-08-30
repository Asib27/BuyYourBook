import { Button, Card, CardContent, CardHeader, CardMedia, Grid, Skeleton, Stack } from "@mui/material";
import {  Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import UserService from "../../services/user.service";
import useFailedSnackbarHelper from "../failSnackbar";
import useSuccessSnackbarHelper from "../successSnackbar";
import AddressForm from "./profileForms/addressForm";
import DescriptionForm from "./profileForms/descriptionForm";
import PersonalInfoForm from "./profileForms/personalInfoForm";
import ProfileForm from "./profileForms/profileForm";

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


export default function EditProfile(props){
    const { setOpenSnackbar, SnackbarHelper} = useSuccessSnackbarHelper("Info update succesfully");
    const { setFailOpenSnackbar, FailedSnackbarHelper} = useFailedSnackbarHelper("Info could not be updated. Please try again.");
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
                    <PlatformInfoForm userInfo={userInfo} success={setOpenSnackbar} fail={setFailOpenSnackbar}/>
                </Grid>

                <Grid
                    item
                    lg={6}
                    sm={6}
                    xl={6}
                    xs={12}
                >
                    <PersonalInfoForm  success={setOpenSnackbar} fail={setFailOpenSnackbar}/>
                </Grid>

                <Grid
                    item
                    lg={6}
                    sm={6}
                    xl={6}
                    xs={12}
                >
                    <ProfileForm success={setOpenSnackbar} fail={setFailOpenSnackbar}/>
                </Grid>

                <Grid
                    item
                    lg={6}
                    sm={6}
                    xl={6}
                    xs={12}
                >
                    <AddressForm success={setOpenSnackbar} fail={setFailOpenSnackbar}/>
                </Grid>

                <Grid
                    item
                    lg={8}
                    sm={8}
                    xl={8}
                    xs={12}
                >
                    <DescriptionForm success={setOpenSnackbar} fail={setFailOpenSnackbar}/>
                </Grid>
            </Grid>

            <SnackbarHelper/>
            <FailedSnackbarHelper/>
        </Card>
    )
};
