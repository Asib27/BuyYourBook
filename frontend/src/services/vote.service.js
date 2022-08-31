import axios from "axios";
import kConst from "../const";
import AuthService from "./auth.service";

const API_URL = kConst.base_url + 'api/vote';

const axiosPostUtil = async(url, payload)=>{
    const token = AuthService.getToken().jwtToken;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    let data = await axios.post(
        url, payload, config
    ).catch(err => console.log(err.response));

    return data;
}

const upvote = async(reviewId)=>{
    const data = await axiosPostUtil(API_URL + '/upvote?review_id=' + reviewId, {});
    return data;
}

const downvote = async(reviewId)=>{
    const data = await axiosPostUtil(API_URL + '/downvote?review_id=' + reviewId, {});
    return data;
}

const VoteService = {
    upvote, downvote
}

export default VoteService;