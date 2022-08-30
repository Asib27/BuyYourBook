import axios from 'axios';
import kConst from '../const'
import AuthService from './auth.service';

const API_URL = kConst.base_url + '/api/cart';

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
    // const {addItem} = useCart();

    // let data = await axiosPostUtil(kConst.base_url + '/api/review/upvote/1');
    // let data = await axiosGetUtil(API_URL + '/totalPrice');
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
    data = data.data;
    let res = data.map(book=>{
        return {
            'isbn': book[0],
            'edition': book[1],
            'genre': book[2],
            'language': book[3],
            'name': book[4],
            'price': book[5],
            'quantity': book[6]
        };
    });
    console.log(data);
    return data;
}

const removeFromCart = async(bookId)=>{
    let data = await axiosPostUtil(API_URL + '/remove?bookId=' + bookId, {
        bookId: bookId
    });
    return data.status === 200;
}

const emptyCart = async()=>{
    let data = await axiosPostUtil(API_URL + '/removeAll', {
    });
    return data.status === 200;
}

const updateQuantity = async(bookId, quantity)=>{
    let data = await axiosPostUtil(API_URL + '/add?bookId=' + bookId + '&quantity=' + quantity, {
        bookId: bookId,
        quantity: quantity
    });
    
    if(data.status === 200)
        return data.data;
    else return undefined;
}

const totalPrice = async()=>{
    let data = await axiosPostUtil(API_URL + '/totalPrice', {
    });
    return data;
}

/**
 * 
 * @param {*} code coupon code
 * @returns discount
 */
const useVerifyCouponCode = async(code)=>{
    let data = await axiosPostUtil(API_URL + '/totalPrice', {
    });
    return data.data;
}

const CartService = {
    getCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    useVerifyCouponCode,
    totalPrice,
    emptyCart
}

export default CartService;