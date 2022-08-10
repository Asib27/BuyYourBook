const addToCart = (book)=>{

}

const removeFromCart = (id)=>{

}

const updateQuantity = (id, quantity)=>{

}

/**
 * 
 * @param {*} code coupon code
 * @returns discount
 */
const verifyCouponCode = (code)=>{
    if(code === 'abc')
        return 10;
    else return 0;
}

const cartService = {
    addToCart,
    removeFromCart,
    updateQuantity,
    verifyCouponCode
}

export default cartService;