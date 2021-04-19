import React, { useState } from 'react'
import LoginForm from './LoginForm'
import Subscribe from './Subscribe'
const LoginPage = (props)=>{
    // const errorMessage = props.location.state?.needToLogin? "You must login":"";
    const [isLoginMode, setIsLoginMode] = useState(true);
    return (
        <div className="login-page">
            <div className="login-page__form">
            {isLoginMode?<LoginForm setIsLoginMode={setIsLoginMode} />:
            <Subscribe setIsLoginMode={setIsLoginMode} />}
            </div>
        </div>
    )
}

export default LoginPage;