import axios from "axios";

export const api = axios.create({
    baseURL: "http://caselastic-env-1.eba-rh86ed2y.ap-southeast-1.elasticbeanstalk.com/api/driver"
});

export const fetchRequest = (token, requestId) => {
    return api.get(`/requests/${requestId}`, {
        headers: {
            Authorization: token
        }
    });
};

export const acceptRequest = (token, driverId, requestId) => {
    return api.put(
        `/${driverId}/requests/${requestId}`,
        {},
        {
            headers: {
                Authorization: token
            }
        }
    );
};

export const cancelRequest = (token, requestId, note) => {
    return api.put(
        "/requests/cancel",
        { requestId, note },
        {
            headers: {
                Authorization: token
            }
        }
    );
};

export const pickedPatient = (token, requestId) => {
    return api.put(
        `/requests/pickup/${requestId}`,
        {},
        {
            headers: {
                Authorization: token
            }
        }
    );
};

export const finishRequest = (token, requestId) => {
    return api.put(
        `/requests/finish/${requestId}`,
        {},
        {
            headers: {
                Authorization: token
            }
        }
    );
};
