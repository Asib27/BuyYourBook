import { Button, Card, CardContent, CardHeader, Skeleton } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import UserService from "../../../services/user.service";
import * as Yup from 'yup';
import { TextField } from "formik-mui";


const DescriptionForm = ({success, fail})=>{
    const [description, setDescription] = useState(undefined);
    useEffect(() => {
        const fetchData = async()=>{
            const data = await UserService.getAboutInfo();
            setDescription(data);
        }
        fetchData();
    }, [])

    return (
        <>
            {
                description?(
                    <Card raised>
                        <CardHeader title='About You'/>
                        <CardContent>
                            <Formik
                                initialValues={{
                                    description: description.description?? '',
                                    favourite_books: description.fav_books?? '',
                                    favourite_genre: description.fav_genre?? ''
                                }}
                                validationSchema={
                                    Yup.object({
                                        description: Yup.string(),
                                        favourite_books: Yup.string(),
                                        favourite_genre: Yup.string(),
                                    })
                                }
                                onSubmit={async(values, {resetForm})=>{
                                    const data = await UserService.updateAboutInfo({
                                        description: values.description,
                                        fav_books: values.favourite_books,
                                        fav_genre: values.favourite_genre
                                    })
                                    
                                    if(data === true) success(true);
                                    else fail(true);
                                    resetForm();
                                }}
                            >
                                {formik=>(
                                    <Form>
                                        <Field
                                            component={TextField}
                                            label='Description'
                                            name='description'
                                            id='description'
                                            margin='normal'
                                            multiline
                                            rows={2}
                                            fullWidth
                                        />

                                        <Field
                                            component={TextField}
                                            label='Favourite Books'
                                            name='favourite_books'
                                            id='favourite_books'
                                            margin='normal'
                                            multiline
                                            rows={2}
                                            fullWidth
                                        />

                                        <Field
                                            component={TextField}
                                            label='Favourite Genre'
                                            name='favourite_genre'
                                            id='favourite_genre'
                                            margin='normal'
                                            multiline
                                            rows={2}
                                            fullWidth
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


export default DescriptionForm;