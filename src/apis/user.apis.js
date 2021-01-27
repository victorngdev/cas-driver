import axios from "axios";

export const api = axios.create({
    // baseURL:
    //     "http://casservernodejsversion01-env.eba-dmxzbmkd.ap-southeast-1.elasticbeanstalk.com/api/users"
    baseURL: "http://192.168.43.241:3000/api/users"
});

export const login = (username, password) => {
    return api.post("/login_driver", {
        username,
        password
    });
};

export const updateUser = (userId, token, user) => {
    return api.put(`/${userId}/profile`, user, {
        headers: {
            Authorization: token
        }
    });
};

export const updateSetting = setting => {
    return api.put("/setting", setting);
};
