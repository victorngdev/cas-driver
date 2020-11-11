import axios from "axios";

export default axios.create({
    // baseURL: "http://192.168.1.170:8084/api"
    // baseURL: "https://cas-capstone.herokuapp.com/api"
    // baseURL: "http://caselastic-env.eba-iukmv232.ap-southeast-1.elasticbeanstalk.com/api"
    baseURL: "http://caselastic-env-1.eba-rh86ed2y.ap-southeast-1.elasticbeanstalk.com/api/users"
});
