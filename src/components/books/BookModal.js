import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../context/CartContext";
import { addBooks } from "../../actions/cartAction";
import QuantityPicker from "../inputs/QuantityPicker";
import { LoginContext } from "../../context/LoginContext";
import { updateCartInDb } from "../../server/db";
import { AdminContext } from "../../context/AdminContext";

const BookModal = ({
    book,
    setBookToDisplay,
    onDeleteClick,
    editButtonOnClick,
}) => {
    const { adminState } = useContext(AdminContext);
    const { cartState, cartDispatch } = useContext(CartContext);
    const { loginState } = useContext(LoginContext);
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [price, setPrice] = useState(book.price);
    const [description, setDescription] = useState(book.description);
    const [modalClassState, setModalClassState] = useState(
        "book-modal-container"
    );

    const closeButton = (
        <FontAwesomeIcon
            icon={faTimes}
            className="close-button"
            onClick={() => {
                setBookToDisplay(undefined);
            }}
        />
    );
    const addToCart = () => {
        const ammount = document.getElementsByClassName("quantity-display")[0]
            .value;
        const books = [book];
        if (ammount > 1) {
            for (let i = 2; i <= ammount; i++) {
                books.push(book);
            }
        }
        if (!!loginState) {
            updateCartInDb([...cartState.concat(books)], loginState)
                .then((message) => {
                    console.log(message.data.message);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        cartDispatch(addBooks(books));
        setModalClassState("book-modal-container close-modal");
        setTimeout(() => {
            setBookToDisplay(undefined);
        }, 200);
    };

    return (
        <div className={modalClassState}>
            <div className="book-modal">
                <div className="image-container">
                    <img src={book.picture} alt={book.title} />
                </div>
                <div className="details">
                    {!!adminState ? (
                        <div>
                            <span className="info">Title: </span>
                            <input
                                className="details__input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    ) : (
                        <h1>{title}</h1>
                    )}

                    {!!adminState ? (
                        <div>
                            <span className="info">Author: </span>
                            <input
                                className="details__input"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </div>
                    ) : (
                        <p>
                            <span className="info">by </span>
                            {author}
                        </p>
                    )}

                    {!!adminState ? (
                        <div>
                            <span className="info">Price: </span>
                            <input
                                className="details__input"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    ) : (
                        <h3>{price}$</h3>
                    )}

                    {!!adminState ? (
                        <div>
                            <span className="info">Description: </span>
                            <textarea
                                className="details__input"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                    ) : (
                        <p className="description">{description}</p>
                    )}

                    {!adminState && (
                        <p>
                            <span className="info">Quantity: </span>
                            <QuantityPicker min={1} max={99} />
                        </p>
                    )}
                    <div className="buttons-container">
                        {!adminState ? (
                            <button
                                className="details__button"
                                onClick={addToCart}
                            >
                                Add To Cart
                            </button>
                        ) : (
                            <button
                                className="save-changes__button"
                                onClick={() =>
                                    editButtonOnClick(
                                        book._id,
                                        title,
                                        author,
                                        description,
                                        price
                                    )
                                }
                            >
                                Save Changes
                            </button>
                        )}
                        {!!adminState && (
                            <button
                                className="delete-book__button"
                                onClick={() => onDeleteClick(book._id)}
                            >
                                Delete Book
                            </button>
                        )}
                    </div>
                </div>
                <div className="close-button">{closeButton}</div>
            </div>
        </div>
    );
};

export default BookModal;
