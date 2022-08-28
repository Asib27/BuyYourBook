import axios from "axios";
import kConst from "../const";
import AuthService from "./auth.service";

let comments = [
    {
        comment_id: 1,
        author: "Lores Ipsum",
        date: "September 14, 2016",
        rating: 3,
        total_vote: 152,
        givenVote: 0,
        comment_text: "This impressive paella is a perfect party dish and a fun meal to cook"+
        "together with your guests. Add 1 cup of frozen peas along with the mussels," +
        "if you like.",

    },
    {
        comment_id: 2,
        author: "Lores Ipsum",
        date: "September 20, 2016",
        rating: 5,
        total_vote: 200,
        givenVote: 1,
        comment_text: "This impssive paella is a perfect party dish and a fun meal to cook"+
        "together with your sts. Add 1 cup of fro peas along with the mussels," +
        "if you like.",

    },
    {
        comment_id: 3,
        author: "Lores Ipsum",
        date: "August 14, 2016",
        rating: 3,
        total_vote: 152,
        givenVote: 0,
        comment_text: "This impressive paella is a perfect party dish and a fun meal to cook"+
        "together with your guests. Add 1 cup of frozen peas along with the mussels," +
        "if you like.",

    },
    {
        comment_id: 4,
        author: "Lores Ipsum",
        date: "August 20, 2016",
        rating: 1,
        total_vote: -10,
        givenVote: 1,
        comment_text: "This impssive paella is a perfect party dish and a fun meal to cook"+
        "together with your sts. Add 1 cup of fro peas along with the mussels," +
        "if you like.",

    },
    // {
    //     "id": 1,
    //     "upVotes": 7,
    //     "downVotes": 5,
    //     "review_text": "The book is excellent",
    //     "rating": 4,
    //     "addDate": "2022-08-10T13:38:47.000+00:00",
    //     "user_name": 3
    // }
];

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

const getComment = async(isbn)=>{
    // const token = AuthService.getToken().jwtToken;
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };

    // let data = await axios.get(API_URL + '/api/book/' + isbn + '/review/all', config)
    //      .then(res => res.data)
    //      .then(res => {
    //         res.user = await axios.get(API_URL + '/api/user/' + res.user_id, config);
    //         return res;
    //      });
    let data = await axiosGetUtil(API_URL + '/api/book/' + isbn + '/review/all');
    console.log(data.data);
    
    return data.data;
}

const getNoOfComment = ()=>{
    return comments.length;
}

const setVoteStatus = (comment_id, status) =>{
    comments[comment_id].givenVote = status;
}

const setTotalVote = (comment_id, vote) =>{
    comments[comment_id].total_vote = vote;
}

const commentService = {
    getComment, 
    getNoOfComment,
    setVoteStatus,
    setTotalVote
}
export default commentService;