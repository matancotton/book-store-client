import axios from "axios";

export const subscribeToSite = async (username, password, email) => {
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/user/subscribe`,
            { username, password, email }
        );
        return res.data;
    } catch (err) {
        console.log(err.message);
    }
};

export const loginToSite = async (username, password) => {
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/user/login`,
            { username, password }
        );
        return res.data;
    } catch (err) {
        if (err.response && err.response.status === 400) {
            throw new Error("Email or password are not correct.");
        }
    }
};

export const loginAsAdmin = async (username, password) => {
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/admin/login`,
            { username, password }
        );
        return res.data;
    } catch (err) {
        throw new Error(err.message);
    }
};
