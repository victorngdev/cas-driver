import axios from "axios";

export const api = axios.create({
    baseURL: "http://192.168.1.170:3000/api/drivers"
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
