import { Button, Card, CardContent, CardHeader, CardMedia, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import UserService from "../../../services/user.service";
import * as Yup from 'yup';
import ImageService from "../../../services/image.service";


const ProfileForm = ({success, fail})=>{
    const userInfo = UserService.getUserData();
    const [curImage, setCurImage] = useState(userInfo.link);

    return (
        <Card raised>
            <CardHeader title='Profile'/>
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

                    onSubmit={ async (values)=>{
                        if(curImage !== userInfo.image){
                            const data = await UserService.updateImage(curImage);
                            if(data === true){
                                success(true);
                            }else{
                                fail(true);
                            }
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

export default ProfileForm;