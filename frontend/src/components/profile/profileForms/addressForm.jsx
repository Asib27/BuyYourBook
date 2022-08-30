import { Button, Card, CardContent, CardHeader, Skeleton } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import UserService from "../../../services/user.service";
import * as Yup from 'yup';
import { TextField } from "formik-mui";

const AddressForm = ({success, fail})=>{
    const [location, setLocation] = useState(undefined);
    useEffect(() => {
        const fetchData = async()=>{
            const data = await UserService.getLocation();
            setLocation(data);
        }
        fetchData();
    }, [])

    return (
        <>
        {
            location?(
                <Card raised>
                    <CardHeader title='Your Address'/>
                    <CardContent>
                        <Formik
                            initialValues={{    
                                streetAddress: location.street, 
                                district: location.district, 
                                country: location.country, 
                            }}
                            validationSchema={
                                Yup.object({
                                    streetAddress: Yup.string(),
                                    district: Yup.string(),
                                    country: Yup.string(),
                                })
                            }
                            onSubmit={async(values, {resetForm})=>{
                                const data = await UserService.updateLocation({
                                    street: values.streetAddress,
                                    district: values.district,
                                    country: values.country
                                });

                                if(data) success(true);
                                else fail(true);
                                
                                resetForm();
                            }}
                        >
                            {formik=>(
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

                                    <Field
                                        component={TextField}
                                        margin="normal"
                                        fullWidth
                                        id="district"
                                        label="District"
                                        name="district"
                                        autoComplete="address-level1"
                                    />

                                    <Field
                                        component={TextField}
                                        margin="normal"
                                        fullWidth
                                        id="country"
                                        label="Country"
                                        name="country"
                                        autoComplete="country-name"
                                    />

                                    <Button
                                        type="submit"
                                        color='primary'
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Submit
                                    </Button>
                                </Form>
                            )}

                        </Formik>
                    </CardContent>
                </Card>
            ):(
                <Skeleton sx={{m : 2}} variant="rectangular" height={400}/>
            )
        }
        </>
    )
}

export default AddressForm;