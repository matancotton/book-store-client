import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import validator from "validator";
import { loginAction } from "../../actions/loginAction";
import { LoginContext } from "../../context/LoginContext";
import { saveUserOnCookie } from "../../cookie/cookie";
import { subscribeToSite } from "../../server/auth";

const Subscribe = (props) => {
    const [inputClasses, setInputClasses] = useState(["", "", "", ""]);
    const [invalidMessages, setInvalidMessages] = useState(["", "", "", ""]);
    const [validInputs, setValidInputs] = useState([
        false,
        false,
        false,
        false,
    ]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const history = useHistory();
    const { loginDispatch } = useContext(LoginContext);

    const isFormInvalid = () => {
        return validInputs.includes(false);
    };

    const setStateOfInputs = (
        inputindex,
        message,
        inputClass,
        isvalidInput
    ) => {
        const newInavlidMessages = [...invalidMessages];
        const newInputClasses = [...inputClasses];
        const newValidInputs = [...validInputs];
        newInavlidMessages[inputindex] = message;
        setInvalidMessages(newInavlidMessages);
        newInputClasses[inputindex] = inputClass;
        setInputClasses(newInputClasses);
        newValidInputs[inputindex] = isvalidInput;
        setValidInputs(newValidInputs);
    };

    const validateInput = (
        value,
        inputindex,
        isValueValidFunc,
        setValue,
        missingValueMessage,
        invalidValueMessage
    ) => {
        if (value.length > 0) {
            if (isValueValidFunc(value)) {
                setStateOfInputs(inputindex, "", "", true);
                setValue(value);
            } else {
                setStateOfInputs(
                    inputindex,
                    invalidValueMessage,
                    "input-invalid",
                    false
                );
            }
        } else {
            setStateOfInputs(
                inputindex,
                missingValueMessage,
                "input-invalid",
                false
            );
        }
    };

    const onChangeUsername = (event) => {
        const newUsername = event.target.value.trim();
        validateInput(
            newUsername,
            0,
            () => true,
            setUsername,
            "You must enter username"
        );
    };

    const onChangeEmail = (event) => {
        const newEmail = event.target.value.trim();

        validateInput(
            newEmail,
            1,
            validator.isEmail,
            setEmail,
            "You must enter your email",
            "Email invalid"
        );
    };

    const onChangePassword = (event) => {
        const newPassword = event.target.value.trim();
        const isPasswordValid = (value) => value.length >= 7;
        validateInput(
            newPassword,
            2,
            isPasswordValid,
            setPassword,
            "You must enter password",
            "Password must contain at least 7 characters"
        );
    };

    const onChangePasswordRepeated = (event) => {
        const passwordRepeated = event.target.value.trim();
        const isPasswordRepeatedValid = (value) => password === value;
        validateInput(
            passwordRepeated,
            3,
            isPasswordRepeatedValid,
            setRepeatedPassword,
            "You must enter again your password",
            "The two passwords are not identical"
        );
    };

    const onSubmitform = (event) => {
        event.preventDefault();
        if (isFormInvalid()) {
            if (username === "") {
                setStateOfInputs(
                    0,
                    "You must enter a valid username",
                    "input-invalid",
                    false
                );
            } else if (email === "") {
                setStateOfInputs(
                    1,
                    "You must enter an email adress",
                    "input-invalid",
                    false
                );
            } else if (password === "") {
                setStateOfInputs(
                    2,
                    "You must enter a password",
                    "input-invalid",
                    false
                );
            } else if (repeatedPassword === "") {
                setStateOfInputs(
                    3,
                    "You must enter again your password",
                    "input-invalid",
                    false
                );
            }
            return;
        }
        subscribeToSite(username, password, email).then(
            (userData) => {
                loginDispatch(loginAction(userData));
                saveUserOnCookie(userData);
                history.push("/");
            },
            (err) => {
                // if (err.message === "EMAIL_EXISTS") {
                //     setInputClasses(["", "", "input-invalid", "", ""]);
                //     setInvalidMessages(["", "", "Mail exist.", "", ""]);
                //     setValidInputs([true, true, false, true, true]);
                // }
                console.log(err.message);
            }
        );
    };

    const onClickLogin = () => {
        props.setIsLoginMode(true);
    };

    return (
        <form onSubmit={onSubmitform} className="login-form">
            <h3>Subscribe</h3>
            <input placeholder="Username" onChange={onChangeUsername} />
            {invalidMessages[0] !== "" && (
                <div className={inputClasses[0]}>{invalidMessages[0]}</div>
            )}
            <input placeholder="Email" onChange={onChangeEmail} />
            {invalidMessages[1] !== "" && (
                <div className={inputClasses[1]}>{invalidMessages[1]}</div>
            )}
            <input
                type="password"
                placeholder="Password"
                onChange={onChangePassword}
            />
            {invalidMessages[2] !== "" && (
                <div className={inputClasses[2]}>{invalidMessages[2]}</div>
            )}
            <input
                type="password"
                placeholder="Repeat password"
                onChange={onChangePasswordRepeated}
            />
            {invalidMessages[3] !== "" && (
                <div className={inputClasses[3]}>{invalidMessages[3]}</div>
            )}
            <div className="login-form__nav">
                <button className="button" type="submit">
                    Submit
                </button>
                <div onClick={onClickLogin} className="switch-form">
                    Login
                </div>
            </div>
        </form>
    );
};

export default Subscribe;
