import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminContextProvider from "../../context/AdminContext";
import CartContextProvider from "../../context/CartContext";
import LoginContextProvider from "../../context/LoginContext";
import AddBook from "../books/AddBook";
import Home from "../home/Home";
import LoginPage from "../login/LoginPage";
import Header from "../main/Header";
import NotFound from "../main/NotFound";
import AdminRoute from "./AdminRouter";
import PublicRoute from "./PublicRoute";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <CartContextProvider>
                <AdminContextProvider>
                    <LoginContextProvider>
                        <Header />
                        <Switch>
                            <Route path="/" component={Home} exact={true} />
                            <PublicRoute path="/login" component={LoginPage} />
                            <AdminRoute path="/books/add" component={AddBook} />
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </LoginContextProvider>
                </AdminContextProvider>
            </CartContextProvider>
        </BrowserRouter>
    );
};

export default AppRouter;
