import axios from "axios";

export const api = axios.create({
    baseURL: "http://192.168.1.170:3000/api/users"
    // baseURL: "https://cas-server-nodejs.herokuapp.com/api/users"
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
