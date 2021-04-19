import React, { useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faShoppingCart,
    faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../context/CartContext";
import Cart from "./Cart";
import { LoginContext } from "../../context/LoginContext";
import { logoutAction } from "../../actions/loginAction";
import { deleteUserFromCookie } from "../../cookie/cookie";
import { emptyCart } from "../../actions/cartAction";
import { AdminContext } from "../../context/AdminContext";
import { adminLogoutAction } from "../../actions/adminAction";
import { deleteadminFromCookie } from "../../cookie/adminCookie";

const Header = () => {
    const { loginState, loginDispatch } = useContext(LoginContext);
    const { adminState, adminDispatch } = useContext(AdminContext);
    const { cartState, cartDispatch } = useContext(CartContext);
    const [isCartVisible, setIsCartVisible] = useState(false);
    const [cartClassState, setCartClassState] = useState("header-icon");
    const history = useHistory();
    const cart = (
        <FontAwesomeIcon className={cartClassState} icon={faShoppingCart} />
    );
    const home = <FontAwesomeIcon className="header-icon" icon={faHome} />;
    const loginIcon = <FontAwesomeIcon icon={faSignInAlt} />;

    const logoutClick = () => {
        if (!!adminState) {
            adminDispatch(adminLogoutAction());
            deleteadminFromCookie();
        } else {
            loginDispatch(logoutAction());
            cartDispatch(emptyCart());
            deleteUserFromCookie();
        }
        history.push("/");
    };

    const closeCart = () => {
        if (document.getElementsByClassName("shopping-cart").length === 0)
            return;
        const cartCss = document.getElementsByClassName("shopping-cart")[0];
        cartCss.classList.add("close-cart");
        setTimeout(() => {
            setIsCartVisible(false);
        }, 400);
    };

    useEffect(() => {
        if (cartState.length > 0) {
            setCartClassState("header-icon wobble-hor-bottom");
            setTimeout(() => {
                setCartClassState("header-icon");
            }, 1000);
        }
    }, [cartState]);

    return (
        <header className="header" onMouseLeave={closeCart}>
            <div className="header-nav">
                <NavLink
                    className="nav-link"
                    activeClassName="active-link"
                    to="/"
                    exact={true}
                >
                    {home}
                </NavLink>
                <div className="links">
                    {!!loginState || !!adminState ? (
                        <div className="nav-link" onClick={logoutClick}>
                            Log-out
                        </div>
                    ) : (
                        <NavLink
                            className="nav-link"
                            activeClassName="active-link"
                            to="/login"
                        >
                            {loginIcon}
                        </NavLink>
                    )}

                    {!!adminState ? (
                        <NavLink
                            className="nav-link"
                            activeClassName="active-link"
                            to="/books/add"
                        >
                            Add A Book
                        </NavLink>
                    ) : (
                        <div
                            className="nav-link"
                            onMouseEnter={() => setIsCartVisible(true)}
                            onTouchStart={() => setIsCartVisible(true)}
                            onTouchEnd={{ closeCart }}
                        >
                            {cart}{" "}
                            <span className="cart-size">
                                ({cartState.length})
                            </span>
                            {isCartVisible && <Cart />}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
