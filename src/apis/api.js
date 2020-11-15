import axios from "axios";

export default axios.create({
    // baseURL: "http://192.168.1.170:8084/api"
    // baseURL: "https://cas-capstone.herokuapp.com/api"
    // baseURL: "http://caselastic-env.eba-iukmv232.ap-southeast-1.elasticbeanstalk.com/api"
    baseURL: "http://caselastic-env-1.eba-rh86ed2y.ap-southeast-1.elasticbeanstalk.com/api/users"
});

export const uploadImage = async base64str => {
    let body = new FormData();
    body.append("image", base64str);
    const response = await axios({
        method: "post",
        url: "https://api.imgbb.com/1/upload?&key=4db83994c2bb263720daf5ec3d963a54",
        data: body,
        headers: { "Content-Type": "multipart/form-data" }
    });

    return response.data.data.display_url;
};
