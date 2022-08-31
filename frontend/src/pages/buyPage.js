import { AlertTitle, Box, Button, Card, Divider, IconButton, Paper, Skeleton, Snackbar, Stack, Typography } from "@mui/material";
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
import CartService from "../services/cart.service";
import useSuccessSnackbarHelper from "../components/successSnackbar";
import useFailedSnackbarHelper from "../components/failSnackbar";
import UserService from "../services/user.service";
import kConst from "../const";
import axios from "axios";

let addressResponse = "";

const AddressCard = (props)=>{
    const [userInfo, setUserInfo] = useState(undefined);
    useEffect(()=>{
        const fetchData = async()=>{
            let data = await UserService.getCurrentUserFullInfo();
            console.log(data);
            setUserInfo(data);
        }
        fetchData();
    }, [])

    return (
        <>
        {
            userInfo?(
                <Card sx={{width: '50%', m: 2, p: 2}}>
                    <Formik
                    initialValues={{
                        email: userInfo.email??'', 
                        name: (!userInfo.first_name && userInfo.middle_name && userInfo.last_name) ? 'N/A' 
                        : (userInfo.first_name??'') + ' ' + (userInfo.middle_name??'') + ' '+ (userInfo.last_name??''), 
                        streetAddress: userInfo.location.street??'', 
                        district: userInfo.location.district??'', 
                        country: userInfo.location.country??"", 
                        phone: userInfo.phone_number??'', 
                        BackupPhoneNo: userInfo.backup_phone_number??'', 
                        checked: false
                    }}
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
                            />

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
            ):(
                <Skeleton sx={{m : 2}} variant="rectangular" height={500}/>
            )
        }
        </>
        
    )
}

const BuyCard = ({update})=>{
    const { setOpenSnackbar, SnackbarHelper} = useSuccessSnackbarHelper("Info update succesfully");
    const { setFailOpenSnackbar, FailedSnackbarHelper} = useFailedSnackbarHelper("Coupon you entered maybe expired or invalid ");
    const [discountedPrice, setDiscountedPrice] = useState(0);

    const [cartTotal, setCartTotal] = useState(undefined);
    useEffect(()=>{
        const fetchData = async()=>{
            const data = await CartService.totalPrice();
            setCartTotal(data);
            setDiscountedPrice(data);
        }
        fetchData();
    }, [])


    const couponOnClick = async(code)=>{
        const price = await cartService.verifyCouponCode(code);
        setDiscountedPrice(price);
        if(price === cartTotal){
            setFailOpenSnackbar(true);
        }else{
            setOpenSnackbar(true);
        }
    }

    
    const onToken = async(token)=>{
        console.log(token);

        await axios.post(kConst.base_url + "/charge", "", {
            headers: {
                token: token.id,
                amount: 500,
        },}).then(() => {
            alert("Payment Success");
        }).catch((error) => {
            alert(error);
        });
        
    }

    return (
        <Paper sx={{width: '100%', m: 2,  p: 2}}>
            <Stack direction='column' sx={{width: '100%',}}>
                {
                    cartTotal? (
                        <Box sx={{display: 'flex', justifyContent:'space-between', mx:2, mt:2}}>
                            <Typography variant='h6'>Total Price</Typography>
                            <Typography>{'BDT ' + cartTotal}</Typography>
                        </Box>
                    ):(
                        <Skeleton sx={{m : 2}} variant="rectangular" height={75}/>
                    )
                }

                {
                    cartTotal? (
                        <Box sx={{display: 'flex', justifyContent:'space-between', m:2}}>
                            <Typography variant='h6'>Discount</Typography>
                            <Typography >{'BDT ' + (cartTotal - discountedPrice)}</Typography>
                        </Box>
                    ):(
                        <Skeleton sx={{m : 2}} variant="rectangular" height={75}/>
                    )
                }

                <Divider variant="inset"/>

                {
                    cartTotal? (
                        <Box sx={{display: 'flex', justifyContent:'space-between', m:2}}>
                            <Typography color='red' variant='h6'>Final Price</Typography>
                            <Typography color='red'>{'BDT ' + discountedPrice}</Typography>
                        </Box>
                    ):(
                        <Skeleton sx={{m : 2}} variant="rectangular" height={75}/>
                    )
                }

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
                        description={"Your total is BDT " + discountedPrice}
                        amount={discountedPrice * 100}
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
            <SnackbarHelper/>
            <FailedSnackbarHelper/>
        </Paper>
    )
}

const KEY = "pk_test_51LVfwtSCK00cFVdUgCeGovR4HGLHmQ9HtDVTgTQUZhYwJEmsZFNOubShcJsl3JZO6frCTUph4W1LsVqKsmk7YT2r00dnsdtm9S";

export default function BuyPage(props){
    const [updateNeeded, setUpdateNeeder] = useState(true);
    const [cart, setCart] = useState(undefined);

    const removeAllClicked = async()=>{
        await CartService.emptyCart();
        setUpdateNeeder(false);
    }
    
    useEffect(() => {
      const fetchData = async()=>{
        const data = await CartService.getCart();
        setCart(data);
        setUpdateNeeder(true);
      }
      console.log('a');
      fetchData();
    }, [updateNeeded])
    
    const CartView = ({cart})=>(
        <>
        {
            (cart && cart.length)? (
                <>
                {
                    cart.map((book, idx)=>{
                        return (<BookCardSmall key={idx} item={book} update={()=>setUpdateNeeder(!updateNeeded)}/>);
                    })
                }
                </>
            ) : (
                (<Typography variant='h5' sx={{border: '2px solid', p: 2, mt: 1}}>Your cart is empty</Typography>)
            )
        }
        </>
    )

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
                cart? (<CartView cart={cart}/>) : 
                (<Skeleton sx={{m : 2}} variant="rectangular" height={400}/>)
            }

            <Box sx={{display: 'flex'}}>
                <AddressCard/>
                <Box>
                    <BuyCard update={()=>setUpdateNeeder(!updateNeeded)}/>
                </Box>
            </Box>
        </Box>
    )
};