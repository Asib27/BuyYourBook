import axios from "axios";
import kConst from "../const";
import AuthService from "./auth.service";

const API_KEY = kConst.base_url + '/api/user';

const getUserData = ()=>{
    const user =  JSON.parse(localStorage.getItem("user"));
    delete user.accessToken;
    delete user.refreshToken;

    return user;
}

const getUsername = ()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    return user.username;
}

const getUserAvatar = ()=>{
    const user = JSON.parse(localStorage.getItem("user"));

    if(!user) return undefined;
    return {
        username: user.username.toLowerCase().charAt(0).toUpperCase()+(user.username.slice(1).toLowerCase()),
        image: user.link,
    }
}


const getUserDescriber = ()=>{
    return "Newbie";
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

const updatePersonalInfo = async(values)=>{
    let data = await axiosPostUtil(API_KEY + '/add/personal', values);
    return data.status === 200;
}

const getPersonalInfo = async(values)=>{
    let data = await axiosGetUtil(API_KEY + '/get/personal');;
    return data.data;
}

const updateAboutInfo = async(values)=>{
    let data = await axiosPostUtil(API_KEY + '/add/about', values);
    return data.status === 200;
}

const getAboutInfo = async(values)=>{
    let data = await axiosGetUtil(API_KEY + '/get/about');;
    return data.data;
}

const updateImage = async(img)=>{
    let username = getUsername();
    let data = await axiosPostUtil(API_KEY + '/edit?username=' + username +"&imageLink=" + img, {});
    console.log(data);

    let user = JSON.parse(localStorage.getItem("user"));
    user.link = img;
    localStorage.setItem("user", JSON.stringify(user));
    return data.status === 200;
}

const updateLocation = async(loc)=>{
    let data = await axiosPostUtil(API_KEY + '/add/Location', loc);
    return data.status===200;
}

const getLocation = async()=>{
    let data = await axiosGetUtil(API_KEY + '/get/location');;
    return data.data;
}

const getAllUsers = async()=>{
    let data = await axiosGetUtil(API_KEY + '/all');
    return data.data;
}

const getCurrentUserFullInfo = async()=>{
    let data = await axiosGetUtil(API_KEY + '/currentUser');
    return data.data;
}

const getFollowers = async()=>{
    let data = await axiosGetUtil(API_KEY + '/get/followedBy');
    return data.data;
}

const getFollowing = async()=>{
    let data = await axiosGetUtil(API_KEY + '/get/whomFollows');
    return data.data;
}

const UserService = {
    getUserData,
    getUsername,
    getUserAvatar,
    getUserDescriber,
    updatePersonalInfo,
    updateAboutInfo,
    updateImage,
    getPersonalInfo,
    getAboutInfo,
    updateLocation,
    getLocation,
    getAllUsers,
    getCurrentUserFullInfo,
    getFollowers,
    getFollowing
}

export default UserService;