import axios from "axios";
import { RNS3 } from "react-native-aws3";

import aws from "../config/awskey";

const api = axios.create({
    // baseURL:
    //     "http://casservernodejsversion01-env.eba-dmxzbmkd.ap-southeast-1.elasticbeanstalk.com/api"
    baseURL: "http://192.168.43.241:3000/api"
});

export const uploadImage = base64str => {
    let body = new FormData();
    body.append("image", base64str);
    return axios({
        method: "post",
        url: "https://api.imgbb.com/1/upload?&key=4db83994c2bb263720daf5ec3d963a54",
        data: body,
        headers: { "Content-Type": "multipart/form-data" }
    });
};

export const uploadImageToS3 = file => {
    const config = {
        bucket: aws.bucketName,
        region: "ap-southeast-1",
        accessKey: aws.accessKey,
        secretKey: aws.secretKey,
        successActionStatus: 201
    };

    return RNS3.put(file, config);
};

export const fetchHistory = (token, userId, pageIndex) => {
    return api.get(`/driver/${userId}/requests/history?pageIndex=${pageIndex}`, {
        headers: {
            Authorization: token
        }
    });
};

export const fetchHistoryDetails = (token, requestId) => {
    return api.get(`driver/history/details/${requestId}`, {
        headers: {
            Authorization: token
        }
    });
};

export const checkExistedPhoneNumber = phone => {
    return api.get(`/users/check_exist?username=${phone}`);
};

export const checkIsRegister = phone => {
    return api.get(`/users/drivers/registered?username=${phone}`);
};

export const registerAccount = user => {
    return api.post("/users/signup_driver", user);
};

export const resetPassword = user => {
    return api.put("/users/drivers/forget_password", user);
};

export const checkIsRegisteredAmbulance = (token, licensePlate) => {
    return api.get(`/driver/ambulances/${licensePlate}`, {
        headers: {
            Authorization: token
        }
    });
};

export const fetchConfig = token => {
    return api.get("/system/configurations", {
        headers: {
            Authorization: token
        }
    });
};
