import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:5000/api/users"
    baseURL: "http://caselastic-env-1.eba-rh86ed2y.ap-southeast-1.elasticbeanstalk.com/api/driver"
});

export const fetchAmbulance = (token, userId) => {
    return api.get(`/${userId}/ambulances`, {
        headers: {
            Authorization: token
        }
    });
};

export const registerAmbulance = (token, userId, ambulance) => {
    return api.post(`/${userId}/ambulances`, ambulance, {
        headers: {
            Authorization: token
        }
    });
};

export const updateAmbulance = (token, userId, ambulance) => {
    return api.put(`/${userId}/ambulances`, ambulance, {
        headers: {
            Authorization: token
        }
    });
};

export const getAmbulanceNote = (token, ambulanceId) => {
    return api.get(`/ambulances/${ambulanceId}/get_note`, {
        headers: {
            Authorization: token
        }
    });
};
