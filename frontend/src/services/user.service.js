
const getUserData = ()=>{
    return JSON.parse(localStorage.getItem("user"));
}

const getUsername = ()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    return user.username;
}

const getUserAvatar = ()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    return {
        username: user.username.toLowerCase().charAt(0).toUpperCase()+(user.username.slice(1).toLowerCase()),
        image: user.image,
    }
}

const getUserDescriber = ()=>{
    return "Newbie";
}

const UserService = {
    getUserData,
    getUsername,
    getUserAvatar,
    getUserDescriber
}

export default UserService;