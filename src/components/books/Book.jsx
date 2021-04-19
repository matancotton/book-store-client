import React from "react";

const Book = ({ book, setBookToDisplay }) => {
    return (
        <button
            className="book"
            onClick={() => {
                setBookToDisplay(book);
            }}
        >
            {book.picture ? (
                <img src={book.picture} alt="" />
            ) : (
                <div className="empty-photo"></div>
            )}
            <div>
                <p>{book.title}</p>
                <p>{book.price}$</p>
            </div>
        </button>
    );
};

export default Book;
