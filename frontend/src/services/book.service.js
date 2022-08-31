import axios from "axios";
import kConst from "../const";
import AuthService from "./auth.service";

const API_URL = kConst.base_url + "/api/book";


// export const errorUtils = {
//     getError: (error) => {
//       let e = error;
//       if (error.response) {
//         e = error.response.data;                   // data, status, headers
//         if (error.response.data && error.response.data.error) {
//           e = error.response.data.error;           // my app specific keys override
//         }
//       } else if (error.message) {
//         e = error.message;
//       } else {
//         e = "Unknown error occured";
//       }
//       return e;
//     },
//   };

const getBookIds = async ()=>{
    const token = AuthService.getToken().jwtToken;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    let data = await axios.get(
        API_URL + '/get/random/10', config
    ).catch(err => console.log(err.response));
    
    return data.data;
}

const getBookByIsbn = async (isbn)=>{
    const token = AuthService.getToken().jwtToken;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let data = await axios.get(
        API_URL + '/' + isbn,
        config
    ).catch(err => console.log(err.response));

    return data.data;
}

const addBooks = async(book)=>{
    const token = AuthService.getToken().jwtToken;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let data = await axios.get(
        API_URL + '/add' , book,
        config
    ).catch(err => console.log(err.response));

    return data.data;
}

const getAllBooks = async()=>{
    const token = AuthService.getToken().jwtToken;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    let data = await axios.get(
        API_URL + '/', config
    ).catch(err => console.log(err.response));
    
    return data.data;
}

const bookService = {
    getBookIds,
    getBookByIsbn,
    addBooks,
    getAllBooks
}

export default bookService;