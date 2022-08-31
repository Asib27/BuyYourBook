import axios from "axios";
import kConst from "../const";
import AuthService from "./auth.service";

const API_KEY = kConst.base_url + '/api/cart';

const addCoupon = async(body)=>{
    const token = AuthService.getToken().jwtToken;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    let data = await axios.post(
        API_KEY + '/add', body, config
    ).catch(err => console.log(err.response));

    return data;
}

const CouponService = {
    addCoupon
}

export default CouponService;