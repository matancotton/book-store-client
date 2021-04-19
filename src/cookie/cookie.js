import cookie from 'js-cookie';

const USER_DATA = "user-data";

export const saveUserOnCookie = (userdata) => {
    const jsonUserData = JSON.stringify(userdata);
    cookie.set(USER_DATA, jsonUserData, { expires: 1 })
}

export const deleteUserFromCookie = () => {
    cookie.remove(USER_DATA);
};

export const getUserFromCookie = () => {
    const jsonUserData = cookie.get(USER_DATA)
    if (jsonUserData === undefined) return null;
    return JSON.parse(jsonUserData);
}