import axios from "axios";

const api = axios.create({
    baseURL:
        //     "http://casservernodejsversion01-env.eba-dmxzbmkd.ap-southeast-1.elasticbeanstalk.com/api/driver"
        "http://192.168.43.241:3000/api/driver"
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

export const unregisterAmbulance = (token, ambulanceId) => {
    return api.put(
        `/ambulances/${ambulanceId}/cancel`,
        {},
        {
            headers: {
                Authorization: token
            }
        }
    );
};
