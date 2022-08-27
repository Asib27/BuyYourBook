import axios from "axios";

const uploadImage = async (img)=>{
    let body = new FormData();
    body.set('key', '8a238e7465d66d91a7257d177326e45c');
    body.append('image', img);

    let data = await axios({
        method: 'post',
        url: 'https://api.imgbb.com/1/upload',
        data: body
    })

    return data.data;
}

const getImageUrl = (img)=>{
    return img.data.displayUrl;
}

const ImageService = {
    uploadImage,
    getImageUrl
}

export default ImageService;