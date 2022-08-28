import axios from "axios";

const API_URL = "https://damp-tundra-37123.herokuapp.com/api/auth/";
const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  }).catch((error)=>{
    console.log(error);
  });
};
const login = async(username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    }).catch((error)=>{
      if(error.response){
        return undefined;
      }
      else{
        return 'SERVER_ERROR';
      }
    });
};

const getToken = ()=>{
  const user = JSON.parse(localStorage.getItem("user"));
  return {
    jwtToken: user.accessToken,
    refreshToken: user.refreshToken
  }
}

const logout = () => {
  localStorage.removeItem("user");
};
const AuthService = {
  register,
  login,
  logout,
  getToken
};
export default AuthService;