import axios from "axios";

export const api = axios.create({
    baseURL:
        //     "http://casservernodejsversion01-env.eba-dmxzbmkd.ap-southeast-1.elasticbeanstalk.com/api/driver"
        "http://192.168.43.241:3000/api/driver"
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

export const cancelRequest = (token, driverId, requestId, reason) => {
    return api.put(
        `/requests/cancel/${driverId}`,
        { requestId, reason },
        {
            headers: {
                Authorization: token
            }
        }
    );
};

export const rejectRequest = (token, queryParams, username) => {
    return api.put(
        `/requests/reject?${queryParams}&username=${username}`,
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
