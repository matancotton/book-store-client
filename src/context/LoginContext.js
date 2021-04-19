import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { setCart } from '../actions/cartAction';
import { getUserFromCookie } from '../cookie/cookie';
import loginReducer, { initialUserState } from '../reducers/loginReducer';
import { getMyCart } from '../server/db';
import { CartContext } from './CartContext';

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
    const { cartDispatch } = useContext(CartContext);
    const [loginState, loginDispatch] = useReducer(loginReducer,getUserFromCookie() || initialUserState);

    useEffect(()=> {
        if (!!loginState) {
            getMyCart(loginState).then((cart)=> {
                if (!!cart)
                    cartDispatch(setCart(cart))
            })
            .catch((err)=> {
                console.log(err)
            })
        }
    },[loginState])
    return (
        <LoginContext.Provider value={{loginState, loginDispatch}}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider;
