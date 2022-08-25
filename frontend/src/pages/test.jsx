import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { Input } from "@mui/material";
import axios from "axios";


export default function MyForm() {
	const fileFormats = ["application/pdf"];
	const imageFormats = ["image/png", "image/svg", "image/jpeg"];
	const initialValues = {
		file: null,
		image: null,
	};

	const validationSchema = yup.object({
		file: yup.mixed().required(),
	});

    const uploadImage = async (img)=>{
        let body = new FormData();
        body.set('key', '8a238e7465d66d91a7257d177326e45c');
        body.append('image', img);

        return await axios({
            method: 'post',
            url: 'https://api.imgbb.com/1/upload',
            data: body
          })
    }

    const handleSubmit = async (values)=>{
        console.log(values);
        const data = await uploadImage(values.file);
        console.log(data.data);
    }

	return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
        >
            {(formProps)=>(
                <Form>
                    <Input type="file" name="file" onChange={(event)=>{
                        formProps.setFieldValue('file', event.target.files[0]);
                    }}
                    />
                    <button type="submit">Submit</button>
                </Form>
            )}
		</Formik>
	);
}
