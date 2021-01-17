import axios from "axios";

export const api = axios.create({
    baseURL: "http://192.168.1.170:3000/api/driver"
    // baseURL: "https://cas-server-nodejs.herokuapp.com/api/driver"
});

export const fetchRequest = (token, queryParams) => {
    return api.get(`/requests?${queryParams}`, {
        headers: {
            Authorization: token
        }
    });
};

export const acceptRequest = (token, driverId, requestId, username) => {
    return api.put(
        `/${driverId}/requests?requestId=${requestId}&username=${username}`,
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

export const rejectRequest = (token, requestId, username) => {
    return api.put(
        `/requests/reject?requestId=${requestId}&username=${username}`,
        {},
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
