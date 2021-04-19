import React, { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { addABookToDB } from "../../server/db";
import GeneralModal from "../main/GeneralModal";

const AddBook = () => {
    const [imageUrlState, setImageUrlState] = useState("");
    const [errorState, setErrorState] = useState("");
    const { adminState } = useContext(AdminContext);
    const [isVisibleModal, setisVisibleModal] = useState(false);

    const onChangeImage = (e) => {
        const url = e.target.value.trim();
        setImageUrlState(url);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value.trim();
        const author = document.getElementById("author").value.trim();
        const description = document.getElementById("description").value.trim();
        const price = document.getElementById("price").value.trim();
        const image = document.getElementById("picture").value.trim();
        if (title === "") {
            setErrorState("must fill in at least a Title!");
            return;
        }

        const book = { title, author, description, price, picture: image };

        addABookToDB(book, adminState.token)
            .then((result) => {
                document.getElementById("title").value = "";
                document.getElementById("author").value = "";
                document.getElementById("description").value = "";
                document.getElementById("price").value = "";
                document.getElementById("picture").value = "";
                setImageUrlState("");
                setisVisibleModal(true);
            })
            .catch((err) => {
                setErrorState(err.message);
            });
    };
    return (
        <div className="addBook">
            <form className="addBook__Form" onSubmit={onSubmitForm}>
                <h1>Add A Book</h1>
                {!!errorState && (
                    <div className="error-message">{errorState}</div>
                )}
                <div className="input-container">
                    <label htmlfor="title">Title: </label>
                    <input className="field-input" type="text" id="title" />
                </div>
                <div className="input-container">
                    <label htmlfor="author">Author: </label>
                    <input className="field-input" type="text" id="author" />
                </div>
                <div className="input-container">
                    <label htmlfor="description">Description: </label>
                    <textarea
                        className="textarea-input"
                        id="description"
                    ></textarea>
                </div>
                <div className="input-container">
                    <label htmlfor="price">Price: </label>
                    <input
                        className="field-input"
                        type="number"
                        id="price"
                        step="0.01"
                    />
                </div>
                <div className="input-container">
                    <label htmlfor="picture">Image: </label>
                    <input
                        className="field-input"
                        type="text"
                        id="picture"
                        onChange={onChangeImage}
                    />
                </div>
                <button className="button">Add Book</button>
            </form>
            <div className="addBook__image">
                {!!imageUrlState ? (
                    <img src={imageUrlState} alt="" />
                ) : (
                    <div className="fillInImage"></div>
                )}
            </div>
            {!!isVisibleModal && (
                <GeneralModal
                    title="book was added successfully!!"
                    message=""
                    setisVisibleModal={setisVisibleModal}
                />
            )}
        </div>
    );
};

export default AddBook;
