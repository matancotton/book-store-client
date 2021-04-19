import cookie from "js-cookie";

const ADMIN_DATA = "admin-data";

export const saveadminOnCookie = (admindata) => {
    const jsonadminData = JSON.stringify(admindata);
    cookie.set(ADMIN_DATA, jsonadminData, { expires: 1 });
};

export const deleteadminFromCookie = () => {
    cookie.remove(ADMIN_DATA);
};

export const getadminFromCookie = () => {
    const jsonadminData = cookie.get(ADMIN_DATA);
    if (jsonadminData === undefined) return null;
    return JSON.parse(jsonadminData);
};
