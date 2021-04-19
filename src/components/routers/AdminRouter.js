import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";

const AdminRoute = ({ component: Component, ...rest }) => {
    const { adminState } = useContext(AdminContext);

    return (
        <Route
            {...rest}
            component={(props) => {
                return !!adminState ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                );
            }}
        />
    );
};

export default AdminRoute;
