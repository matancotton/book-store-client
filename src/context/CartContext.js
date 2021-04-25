import React, { createContext, useReducer } from "react";
import cartReducer, { initialcartState } from "../reducers/cartReducer";

export const CartContext = createContext();

const CartContextProvider = (props) => {
    const [cartState, cartDispatch] = useReducer(cartReducer, initialcartState);

    return (
        <CartContext.Provider value={{ cartState, cartDispatch }}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
