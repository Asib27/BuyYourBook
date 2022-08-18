import { AlertTitle, Box, Button, Card, Divider, IconButton, Paper, Snackbar, Stack, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {  TextField } from "formik-mui";
import { forwardRef, useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import BookCardSmall from "../components/book_card_small";
import * as Yup from 'yup';
import cartService from "../services/cart.service";
import MuiAlert from '@mui/material/Alert';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StripeCheckout from "react-stripe-checkout";

let addressResponse = "";

const AddressCard = (props)=>{
    return (
        <Card sx={{width: '50%', m: 2, p: 2}}>
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
                        id="backupPhone"
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

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BuyCard = (props)=>{
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handleSnackbarClose = (event, reason)=>{
        if (reason === 'clickaway') {
            return;
          }
      
        setOpenSnackbar(false);
    }

    const {cartTotal, metadata, updateCartMetadata} = useCart();
    if(metadata.discount === undefined){
        updateCartMetadata({discount: 0});
    }

    const couponOnClick = (code)=>{
        const discount = cartService.verifyCouponCode(code);
        if(discount === 0){
            setOpenSnackbar(true);
        }else{
            updateCartMetadata({discount: discount});
        }
    }

    
    const onToken = (val)=>{
        console.log(val);
    }

    return (
        <Paper sx={{width: '100%', m: 2,  p: 2}}>
            <Stack direction='column' sx={{width: '100%',}}>
                <Box sx={{display: 'flex', justifyContent:'space-between', mx:2, mt:2}}>
                    <Typography variant='h6'>Total Price</Typography>
                    <Typography>{'BDT' + cartTotal}</Typography>
                </Box>
                <Box sx={{display: 'flex', justifyContent:'space-between', m:2}}>
                    <Typography variant='h6'>Discount</Typography>
                    <Typography >{'BDT' + metadata.discount}</Typography>
                </Box>
                <Divider variant="inset"/>
                <Box sx={{display: 'flex', justifyContent:'space-between', m:2}}>
                    <Typography color='red' variant='h6'>Final Price</Typography>
                    <Typography color='red'>{'BDT ' + ((cartTotal < metadata.discount)? 0: (cartTotal - metadata.discount))}</Typography>
                </Box>

                <Formik 
                    initialValues={{coupon: ''}}
                    validationSchema={Yup.object({
                        coupon: Yup.string().required('No coupon code given'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        couponOnClick(values.coupon);
                        setSubmitting(false);
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
                        <ErrorMessage name='coupon'/>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Apply Coupon
                        </Button>

                    </Form>
                </Formik>


                <StripeCheckout 
                        name="BuyYourBook"
                        description="Your total is BDT 20"
                        amount={2000}
                        token={onToken}
                        stripeKey={KEY}
                        currency="BDT"
                    >
                        <Button color='info' fullWidth
                            variant="contained">
                            Buy Now
                        </Button>
                </StripeCheckout>
            </Stack>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                <AlertTitle>Invalid Coupon</AlertTitle>
                    Coupon you entered maybe expired or invalid 
                </Alert>
            </Snackbar>
        </Paper>
    )
}

const KEY = "pk_test_51LVfwtSCK00cFVdUgCeGovR4HGLHmQ9HtDVTgTQUZhYwJEmsZFNOubShcJsl3JZO6frCTUph4W1LsVqKsmk7YT2r00dnsdtm9S";

export default function BuyPage(props){
    const { setItems, items, updateCartMetadata, emptyCart, isEmpty } = useCart();
    const removeAllClicked = ()=>{
        emptyCart();
    }

    useEffect(() => {
        updateCartMetadata({discount: 0});
    }, [])
    
    const onToken = (val)=>{
        console.log(val);
    }

    return (
        <Box sx={{ m: 2}}>
            <Box sx={{display: 'flex',alignItems: 'center'}}>
                <ShoppingCartOutlinedIcon/>
                <Typography variant='h4' sx={{pl: 2}}>Your Cart</Typography>
                <Box sx={{flexGrow: 1}}/>
                <IconButton aria-label="remove all" size='small' onClick={removeAllClicked}>
                    Remove All
                </IconButton>
            </Box>
            {
                isEmpty? <Typography variant='h5' sx={{border: '2px solid', p: 2, mt: 1}}>Your cart is empty</Typography> : ""
            }
            {
                items.map((item)=>{
                    return (<BookCardSmall key={item.id} itemId={item.id}/>);
                })
            }
            <Box sx={{display: 'flex'}}>
                <AddressCard/>
                <Box>
                    <BuyCard/>
                </Box>
            </Box>
        </Box>
    )
};