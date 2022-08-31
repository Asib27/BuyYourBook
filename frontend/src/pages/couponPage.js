import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Input } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";

import CouponService from "../services/couponServices";
  
import { useState } from 'react';
import { ErrorMessage} from 'formik';
import {  TextField as FormicTextField }  from 'formik-mui' ;

import * as Yup from 'yup';
import ImageService from '../services/image.service';
import bookService from '../services/book.service';
  
const BookForm = ({closeModal})=>{
  
    return (
      <Formik
            initialValues={{isbn: '', name: '', edition: '', language: '',
                            genre: '', quantity_available: 1, author: '', publications: '',
                            image: null,
                          }}
            validationSchema={Yup.object({
              isbn: Yup.string().length(13).required(),
              name: Yup.string().required(),
              author: Yup.string().required(),
              publications: Yup.string().required(),
              genre: Yup.string().required(),
              quantity_available: Yup.number(),
              image: Yup.mixed().required(),
            })}
            onSubmit={async (values, { resetForm }) => {
              const data = await ImageService.uploadImage(values.image);
              values.link = data;
              await bookService.addBooks(values);
              closeModal();
            }}
          >
            {(formProps)=>(
              <Form>
                <Field 
                  component={FormicTextField}
                  margin="normal"
                  required
                  fullWidth
                  id="isbn"
                  label="ISBN"
                  name="isbn"
                  autoFocus  
                />
                <ErrorMessage name='isbn'/>
  
                <Field 
                  component={FormicTextField}
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                />
                <ErrorMessage name='name'/>
  
                <Field 
                  component={FormicTextField}
                  margin="normal"
                  required
                  fullWidth
                  id="author"
                  label="Author"
                  name="author"
                />
                <ErrorMessage name='author'/>
  
                <Field 
                  component={FormicTextField}
                  margin="normal"
                  required
                  fullWidth
                  id="publications"
                  label="Publications"
                  name="publications"
                />
                <ErrorMessage name='publications'/>
  
                <Field 
                  component={FormicTextField}
                  margin="normal"
                  fullWidth
                  id="edition"
                  label="Edition"
                  name="edition"
                />
                <ErrorMessage name='edition'/>
  
                <Field 
                  component={FormicTextField}
                  margin="normal"
                  fullWidth
                  id="language"
                  label="language"
                  name="language"
                />
                <ErrorMessage name='language'/>
  
                <Field 
                  component={FormicTextField}
                  margin="normal"
                  fullWidth
                  required
                  id="genre"
                  label="Genre"
                  name="genre"
                />
                <ErrorMessage name='genre'/>
  
                <Field 
                  component={FormicTextField}
                  margin="normal"
                  fullWidth
                  id="quantity_available"
                  label="Quantity Available"
                  name="quantity_available"
                />
                <ErrorMessage name='quantity_available'/>
  
                <Input type="file" name="image" onChange={(event)=>{
                    formProps.setFieldValue('image', event.target.files[0]);
                  }}
                />
                <ErrorMessage name='image'/>
        
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
  
              </Form>
            )}
          </Formik>
    );
}



const CouponPage = ()=>{
    const [openedModal, setOpenedModal] = useState(false);
  const handleModalClose = ()=> setOpenedModal(false);


  const ProductAddDialog = (props) =>{
    return (
      <Dialog 
        open={openedModal} 
        onClose={handleModalClose}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle>Add product</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add product info here
                    </DialogContentText>
                    
                    <BookForm closeModal={handleModalClose}/>

                </DialogContent >
                <DialogActions >
                    <Button onClick={handleModalClose} fullWidth>Cancel</Button>
                </DialogActions>
      </Dialog>
    )
  }


    return (
        <Box sx={{width: '50%'}}>
            <Card>
                <Formik 
                        initialValues={{coupon: ''}}
                        validationSchema={Yup.object({
                            coupon: Yup.string().required('No coupon code given'),
                        })}
                        onSubmit={async(values, { setSubmitting }) => {
                            const data = await CouponService.addCoupon(values);
                            console.log(data);
                        }}
                    >
                        <Form >
                            <Field
                                component={TextField}
                                margin="normal"
                                fullWidth
                                id="coupon"
                                label="Coupon Code"
                                name="coupon"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Create Coupon
                            </Button>

                        </Form>
                    </Formik>

                    <Button
                        color="primary"
                        variant="contained"
                        fullWidth
                        onClick={(event) => {setOpenedModal(true);}}
                    >
                        Add products
                    </Button>
                    <ProductAddDialog/>
            </Card>
        </Box>
    )
}

export default CouponPage;