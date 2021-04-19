import React, { createContext, useReducer } from "react";
import { getadminFromCookie } from "../cookie/adminCookie";
import adminReducer, { initialAdminState } from "../reducers/adminReducer";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [adminState, adminDispatch] = useReducer(
        adminReducer,
        getadminFromCookie() || initialAdminState
    );

    return (
        <AdminContext.Provider value={{ adminState, adminDispatch }}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
