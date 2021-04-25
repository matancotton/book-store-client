import React, { useContext, useState } from "react";
import Book from "./Book";
import {
    faChevronRight,
    faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { deleteBookInDB, editBookInDB, getBooks } from "../../server/db";
import BookModal from "./BookModal";
import Arrow from "./book-list-arrows/Arrow";
import SmallLoader from "../loaders/SmallLoader";
import GeneralModal from "../main/GeneralModal";
import { AdminContext } from "../../context/AdminContext";

const BooksList = ({
    books,
    setBooks,
    searchKey,
    booksLength,
    setBooksLength,
    setIsLoaderVisible,
    isLoaderVisible,
}) => {
    const { adminState } = useContext(AdminContext);
    const [bookToDisplay, setBookToDisplay] = useState(undefined);
    const [counter, setCounter] = useState(0);
    const [isGeneralModalVisible, setIsGeneralModalVisible] = useState(false);
    const [generalModalMessage, setGeneralModalMessage] = useState("");

    const editButtonOnClick = (id, title, author, description, price) => {
        if (!adminState) return;
        if (title === "") return;
        setIsLoaderVisible(true);
        const updateData = { title, author, description, price };
        editBookInDB(id, adminState.token, updateData).then((book) => {
            setBookToDisplay(undefined);
            setIsLoaderVisible(false);
            setIsGeneralModalVisible(true);
            setGeneralModalMessage(`The Book: "${book.title}" was updated!`);
            getBooks().then((result) => {
                setBooks(result.books);
            });
        });
    };

    const onDeleteClick = (bookId) => {
        setIsLoaderVisible(true);
        deleteBookInDB(bookId, adminState.token).then((book) => {
            setBookToDisplay(undefined);
            setIsLoaderVisible(false);
            setIsGeneralModalVisible(true);
            setGeneralModalMessage(`The Book: "${book.title}" was deleted!`);
            getBooks().then((result) => {
                setBooks(result.books);
                setBooksLength(result.length);
            });
        });
    };

    return (
        <div className="book-list__container">
            <Arrow
                books={books}
                faChevron={faChevronLeft}
                setBooks={setBooks}
                counter={counter - 8}
                setCounter={setCounter}
                searchKey={searchKey}
                setIsLoaderVisible={setIsLoaderVisible}
            />

            {books.length > 0 ? (
                <div className="book-list">
                    {books.map((book) => (
                        <Book
                            key={book._id}
                            book={book}
                            setBookToDisplay={setBookToDisplay}
                        />
                    ))}

                    {bookToDisplay && (
                        <BookModal
                            book={bookToDisplay}
                            setBookToDisplay={setBookToDisplay}
                            setBooks={setBooks}
                            editButtonOnClick={editButtonOnClick}
                            onDeleteClick={onDeleteClick}
                        />
                    )}
                </div>
            ) : (
                <div className="book-list">
                    <h1>No Results...</h1>
                </div>
            )}

            <Arrow
                books={books}
                faChevron={faChevronRight}
                setBooks={setBooks}
                counter={counter + 8}
                setCounter={setCounter}
                searchKey={searchKey}
                booksLength={booksLength}
                setIsLoaderVisible={setIsLoaderVisible}
            />
            {!!isLoaderVisible && <SmallLoader />}
            {!!isGeneralModalVisible && (
                <GeneralModal
                    title={generalModalMessage}
                    setisVisibleModal={setIsGeneralModalVisible}
                />
            )}
        </div>
    );
};

export default BooksList;
