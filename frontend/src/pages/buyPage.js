import { Box, Button, Card, FormControlLabel, Grid } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Checkbox, TextField } from "formik-mui";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import BookCardSmall from "../components/book_card_small";
import * as Yup from 'yup';

let addressResponse = "";

const AddressCard = (props)=>{
    return (
        <Card sx={{width: '50%'}}>
            <Formik
            initialValues={{email: '', name: '', streetAddress: '', district: '', country: '', phone: '', BackupPhoneNo: '', checked: false}}
            validationSchema={Yup.object({
              email: Yup.string().email('Invalid email address').required('Required'),
              name: Yup.string().required('Required'),
              streetAddress: Yup.string().required("Required"),
              district: Yup.string().required("Required"),
              country: Yup.string().required("Required"),
              phone: Yup.string().required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
                addressResponse = values;
                console.log(addressResponse);
                setSubmitting(false);
            }}
          >
            {formic => (
                <Form>
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
                    <ErrorMessage name='email'/>

                    <Field
                        component={TextField}
                        margin="normal"
                        fullWidth
                        id="name"
                        label="Full Name"
                        name="name"
                        autoComplete="cc-name"
                    />
                    <ErrorMessage name='name'/>

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
                        id="backuoPhone"
                        label="Backup Phone Number"
                        name="backupPhoneNo"
                        autoComplete="tel"
                    />
                    <ErrorMessage name='backupPhoneNo'/>

                    <Button
                        type="submit"
                        color={!formic.values.checked?"warning":"success"}
                        fullWidth
                        variant="contained"
                        onClick={()=> formic.values.checked=true}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {!formic.values.checked?"Not Checked":"Checked"}
                    </Button>

                </Form>
            )}
          </Formik>
        </Card>
    )
}

export default function BuyPage(props){
    const { setItems, items } = useCart();

    const rows = [
        {
            id: 1, 
            book: {
                bookId: 1,
                image: "https://covers.zlibcdn2.com/covers299/books/11/c1/d2/11c1d24ddd14c46f714572faf7cebe6b.jpg",
                name: "The art ",
                author: "Knuth",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate purus quis metus gravida faucibus. Donec sit amet risus dapibus, scelerisque ligula sed, sodales nibh. Aenean tristique rutrum eros, ac molestie libero tempus at. In hac habitasse platea dictumst. Vivamus diam justo, ultricies nec tortor vel, efficitur tincidunt dui. Donec eget iaculis lorem",
                price: "199",
            }, 
            quantity: 2, 
            price: 50,
        },
        {
            id: 2, 
            book: {
                bookId: 2,
                image: "https://covers.zlibcdn2.com/covers299/books/11/c1/d2/11c1d24ddd14c46f714572faf7cebe6b.jpg",
                name: "The art ",
                author: "Knuth",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate purus quis metus gravida faucibus. Donec sit amet risus dapibus, scelerisque ligula sed, sodales nibh. Aenean tristique rutrum eros, ac molestie libero tempus at. In hac habitasse platea dictumst. Vivamus diam justo, ultricies nec tortor vel, efficitur tincidunt dui. Donec eget iaculis lorem",
                price: "199",
            }, 
            quantity: 3, 
            price: 100,
        }
    ];

    useEffect(() => {
      setItems(rows);
    }, [])
    

    return (
        <Box sx={{ m: 2}}>
            {
                items.map((item)=>{
                    return (<BookCardSmall key={item.id} itemId={item.id}/>);
                })
            }
            <AddressCard/>
        </Box>
    )
};