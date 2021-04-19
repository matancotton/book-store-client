import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';


const PublicRoute = ({component:Component, ...rest})=>{
    const {loginState} = useContext(LoginContext)


    return (
        <Route
            {...rest}
            component = {(props)=>{
                return !!loginState ?
                <Redirect to="/" />:
                <Component {...props} />
            }}
        />
    
        )
    };
    

export default PublicRoute;