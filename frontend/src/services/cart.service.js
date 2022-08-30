import axios from 'axios';
import kConst from '../const'
import AuthService from './auth.service';

const API_URL = kConst.base_url + '/api/cart';

const axiosDeleteUtil = async(url, payload)=>{
    const token = AuthService.getToken().jwtToken;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    let data = await axios.delete(
        url, payload, config
    ).catch(err => console.log(err.response));

    return data;
}

const axiosPostUtil = async(url, payload)=>{
    const token = AuthService.getToken().jwtToken;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    // let body = new FormData(payload);
    // console.log(body);

    let data = await axios.post(
        url, payload, config
    ).catch(err => console.log(err.response));

    return data;
}

const axiosGetUtil = async(url)=>{
    const token = AuthService.getToken().jwtToken;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    let data = await axios.get(
        url, config
    ).catch(err => console.log(err.response));

    return data;
}

const addToCart = async (bookId, quantity)=>{
    let data = await axiosPostUtil(API_URL + '/add?bookId=' + bookId + '&quantity=' + quantity, {
        bookId: bookId,
        quantity: quantity
    });
    
    if(data.status === 200)
        return data.data;
    else return undefined;
}

const getCart = async()=>{
    let data = await axiosGetUtil(API_URL + '/get/data');
    return data.data;
}

const removeFromCart = async(bookId)=>{
    let data = await axiosDeleteUtil(API_URL + '/remove?bookId=' + bookId, {
        bookId: bookId
    });
    return data.status === 200;
}

const emptyCart = async()=>{
    let data = await axiosDeleteUtil(API_URL + '/removeAll', {
    });
    return data.status === 200;
}

const updateQuantity = async(bookId, quantity)=>{
    let data = await axiosPostUtil(API_URL + '/updateQuantity?bookId=' + bookId + '&quantity=' + quantity, {
        bookId: bookId,
        quantity: quantity
    });
    
    if(data.status === 200)
        return data.data;
    else return undefined;
}

const totalPrice = async()=>{
    let data = await axiosGetUtil(API_URL + '/totalPrice');
    return data.data;
}

/**
 * 
 * @param {*} code coupon code
 * @returns discount
 */
const verifyCouponCode = async(code)=>{
    let data = await axiosGetUtil(API_URL + '/applyCoupon');
    return data.data;
}

const CartService = {
    getCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    verifyCouponCode,
    totalPrice,
    emptyCart
}

export default CartService;