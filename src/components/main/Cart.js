import React, { useContext, useEffect, useState } from "react";
import { emptyCart } from "../../actions/cartAction";
import { CartContext } from "../../context/CartContext";
import { nanoid } from "nanoid";
import { LoginContext } from "../../context/LoginContext";
import { updateCartInDb } from "../../server/db";
import GeneralModal from "./GeneralModal";
import QuantityPicker from "../inputs/QuantityPicker";
const Cart = () => {
    const { cartState, cartDispatch } = useContext(CartContext);
    const { loginState } = useContext(LoginContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const [booksToShow, setBooksToShow] = useState([]);
    const [numOfBooks, setNumOfBooks] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const emptyCartClick = () => {
        cartDispatch(emptyCart());
        if (!!loginState) {
            updateCartInDb([], loginState)
                .then((result) => {
                    console.log(result.data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    };

    const setVisibleBooks = () => {
        const multipleBooks = [];
        const multipleCount = [];
        cartState.forEach((book) => {
            let foundBook = false;
            multipleBooks.forEach((multipleBook, index) => {
                if (multipleBook.title === book.title) {
                    multipleCount[index]++;
                    foundBook = true;
                }
            });

            if (!foundBook) {
                multipleBooks.push(book);
                multipleCount.push(1);
            }
        });
        setBooksToShow(multipleBooks);
        setNumOfBooks(multipleCount);
    };

    const onBuyClicked = () => {
        setIsModalVisible(true);
        emptyCartClick();
    };

    useEffect(() => {
        setVisibleBooks();
        let price = 0;
        cartState.forEach((book) => {
            price += book.price;
        });
        setTotalPrice(Number.parseFloat(price).toFixed(2));
    }, [cartState]);

    return (
        <div className="shopping-cart">
            {cartState.length > 0 ? (
                <>
                    <div className="shopping-cart__items">
                        {booksToShow.map((book, index) => (
                            <div
                                key={nanoid()}
                                className="shopping-cart__items__item"
                            >
                                <div>
                                    <img src={book.picture} alt={book} />
                                    <p>{book.title}</p>
                                </div>
                                <QuantityPicker
                                    min={0}
                                    max={99}
                                    val={numOfBooks[index]}
                                    cartDispatch={cartDispatch}
                                    book={book}
                                />
                            </div>
                        ))}
                    </div>
                    <div>
                        Total Price:
                        <span className="shopping-cart__total-price">
                            {totalPrice}$
                        </span>
                    </div>
                </>
            ) : (
                <div>
                    <p>No items in the shopping cart!!</p>
                </div>
            )}

            {cartState.length > 0 && (
                <button
                    className="button shopping-cart__button"
                    onClick={onBuyClicked}
                >
                    Buy
                </button>
            )}
            {cartState.length > 0 && (
                <button
                    className="button shopping-cart-empty__button"
                    onClick={emptyCartClick}
                >
                    Empty Cart
                </button>
            )}
            {!!isModalVisible && (
                <GeneralModal
                    setisVisibleModal={setIsModalVisible}
                    title="Thank you for purchasing in our store!"
                />
            )}
        </div>
    );
};

export default Cart;
