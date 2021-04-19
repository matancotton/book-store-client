import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { addBooks } from '../actions/cartAction';
import cartReducer, { initialcartState } from '../reducers/cartReducer';
import { getMyCart, updateCartInDb } from '../server/db';
import { LoginContext } from './LoginContext';

export const CartContext = createContext();

const CartContextProvider = (props) => {
    const [cartState, cartDispatch] = useReducer(cartReducer, initialcartState);    

    return (
        <CartContext.Provider value={{cartState, cartDispatch}} >
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;