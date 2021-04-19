import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { adminLoginAction } from "../../actions/adminAction";
import { loginAction } from "../../actions/loginAction";
import { AdminContext } from "../../context/AdminContext";
import { LoginContext } from "../../context/LoginContext";
import { saveadminOnCookie } from "../../cookie/adminCookie";
import { saveUserOnCookie } from "../../cookie/cookie";
import { loginAsAdmin, loginToSite } from "../../server/auth";

const LoginForm = (props) => {
    const { loginDispatch } = useContext(LoginContext);
    const { adminDispatch } = useContext(AdminContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();
    const onClickSubscribe = () => {
        props.setIsLoginMode(false);
    };

    const onChangeUsernameInput = (event) => {
        const input = event.target.value.trim();
        if (input === "") {
            setIsUsernameValid(false);
            setUsername("");
            return;
        }
        setUsername(input);
        setIsUsernameValid(true);
    };

    const onChangePassword = (event) => {
        const input = event.target.value.trim();
        if (input === "") {
            setPassword("");
            setIsPasswordValid(false);
            return;
        }

        setPassword(input);
        setIsPasswordValid(true);
    };

    const isFormInValid = () => {
        return username === "" || password === "";
    };

    const onSubmitForm = (event) => {
        event.preventDefault();
        if (isFormInValid()) {
            if (username === "") setIsUsernameValid(false);
            if (password === "") setIsPasswordValid(false);
            return;
        }

        loginAsAdmin(username, password)
            .then((userData) => {
                saveadminOnCookie(userData);
                adminDispatch(adminLoginAction(userData));
                history.push("/");
            })
            .catch(() => {
                loginToSite(username, password)
                    .then((userData) => {
                        loginDispatch(loginAction(userData));
                        saveUserOnCookie(userData);
                        history.push("/");
                    })
                    .catch((error) => {
                        setErrorMessage(error.message);
                    });
            });
    };

    return (
        <form onSubmit={onSubmitForm} className="login-form login-mode">
            <h3>Login</h3>
            {errorMessage !== "" && (
                <div className="input-invalid">{errorMessage}</div>
            )}
            <div>
                <input
                    placeholder="username"
                    onChange={onChangeUsernameInput}
                ></input>
                {!isUsernameValid && (
                    <div className="input-invalid">
                        You must enter a valid username
                    </div>
                )}
            </div>
            <div>
                <input
                    type="password"
                    placeholder="password"
                    onChange={onChangePassword}
                ></input>
                {!isPasswordValid && (
                    <div className="input-invalid">
                        You must enter a password
                    </div>
                )}
            </div>
            <button type="submit" className="form-button">
                Submit
            </button>
            <div className="switch-form" onClick={onClickSubscribe}>
                Sign up
            </div>
        </form>
    );
};

export default LoginForm;
