import React from "react";

const GeneralModal = ({ title, message, setisVisibleModal }) => {
    const onOkButtonClicked = () => {
        setisVisibleModal(false);
    };
    return (
        <div className="general-modal__container">
            <div className="general-modal">
                <h1>{title}</h1>
                <h3>{message}</h3>
                <button className="button" onClick={onOkButtonClicked}>
                    OK
                </button>
            </div>
        </div>
    );
};

export default GeneralModal;
