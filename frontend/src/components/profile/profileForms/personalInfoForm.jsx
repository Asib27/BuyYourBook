import { Button, Card, CardContent, CardHeader, Skeleton } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import UserService from "../../../services/user.service";
import * as Yup from 'yup';
import { TextField } from "formik-mui";

const PersonalInfoForm = ({success, fail})=>{
    const [personalInfo, setPersonalInfo] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async()=>{
            const data = await UserService.getPersonalInfo();
            setPersonalInfo(data);
            setLoading(false);
        }
        fetchData();
    }, [])
    

    return (
        <>
            {
                loading? (
                    <Skeleton sx={{m : 2}} variant="rectangular" height={400}/>
                ) : (
                    <Card raised >
                        <CardHeader 
                            title = 'Personal Info'
                        />
                        <CardContent>
                            <Formik 
                                initialValues={{
                                    firstname: personalInfo.first_name?? '', 
                                    middlename: personalInfo.middle_name?? '',
                                    lastname: personalInfo.last_name?? '',
                                    phone: personalInfo.phone_number?? '', 
                                    backupPhoneNo: personalInfo.backup_phone_number?? ''
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
                                onSubmit={async(values, {resetForm})=>{
                                    const data =await UserService.updatePersonalInfo({
                                        first_name: values.firstname,
                                        last_name: values.lastname,
                                        middle_name: values.middlename,
                                        phone_number: values.phone,
                                        backup_phone_number: values.backupPhoneNo
                                    });
                                    
                                    if(data) success(true);
                                    else fail(true);
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
        </>   
    );
}

export default PersonalInfoForm;