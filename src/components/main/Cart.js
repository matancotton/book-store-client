import React, { useContext, useEffect, useState } from "react";
import { emptyCart } from "../../actions/cartAction";
import { CartContext } from "../../context/CartContext";
import { nanoid } from "nanoid";
import { LoginContext } from "../../context/LoginContext";
import { updateCartInDb } from "../../server/db";
import GeneralModal from "./GeneralModal";
const Cart = () => {
    const { cartState, cartDispatch } = useContext(CartContext);
    const { loginState } = useContext(LoginContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const [booksToShow, setBooksToShow] = useState([]);
    const [numOfBooks, setNumOfBooks] = useState([]);
    const [images, setImages] = useState([]);
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
        const booksImages = [];
        cartState.forEach((book) => {
            if (multipleBooks.includes(book.title)) {
                multipleCount[multipleBooks.indexOf(book.title)]++;
            } else {
                multipleBooks.push(book.title);
                multipleCount.push(1);
                booksImages.push(book.picture);
            }
        });
        setBooksToShow(multipleBooks);
        setNumOfBooks(multipleCount);
        setImages(booksImages);
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
                                    <img src={images[index]} alt={book} />
                                    <p>{book}</p>
                                </div>
                                {numOfBooks[index] > 1 && (
                                    <div className="books-counter">
                                        X {numOfBooks[index]}
                                    </div>
                                )}
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
