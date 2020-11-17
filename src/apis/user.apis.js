import axios from "axios";

export const api = axios.create({
    baseURL: "http://caselastic-env-1.eba-rh86ed2y.ap-southeast-1.elasticbeanstalk.com/api/users"
});

export const login = (username, password) => {
    return api.post("/login", {
        username,
        password
    });
};
