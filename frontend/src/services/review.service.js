import axios from "axios";
import kConst from "../const";
import AuthService from "./auth.service";

const API_URL = kConst.base_url;

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

const getRatingAvg = async(isbn)=>{
    let data = await axiosGetUtil(API_URL + '/api/book/' + isbn + '/rating/average_rating');
    return data.data;
}

const getNoOfReview = async(isbn)=>{
    let data = await axiosGetUtil(API_URL + '/api/book/' + isbn + '/rating/count');
    return data.data;
}

const getPercents = async(isbn)=>{
    let data = await axiosGetUtil(API_URL + '/api/book/' + isbn + '/rating/rating_percentage');
    return data.data;
}

const reviewService = {
    getRatingAvg, 
    getNoOfReview,
    getPercents
}

export default reviewService;