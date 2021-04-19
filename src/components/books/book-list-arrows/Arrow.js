import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFilterdBooks } from "../../../server/db";
import SmallLoader from "../../loaders/SmallLoader";

const Arrow = ({
    books,
    faChevron,
    setBooks,
    setCounter,
    counter,
    searchKey,
    booksLength,
    setIsLoaderVisible,
}) => {
    const onArrowClicked = () => {
        if (counter < 0 || counter >= booksLength) return;
        const searchValue = searchKey ? `${searchKey}&` : "";
        const filterValue = searchValue + "skip=" + counter;
        setIsLoaderVisible(true);
        getFilterdBooks(filterValue)
            .then((result) => {
                if (document.documentElement.clientWidth <= 800)
                    setBooks(books.concat(result.books));
                else setBooks(result.books);
                setCounter(counter);
                setIsLoaderVisible(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div
            className={
                counter < 0 || counter >= booksLength
                    ? "book-list__arrow disabled"
                    : "book-list__arrow"
            }
            onClick={onArrowClicked}
        >
            <FontAwesomeIcon icon={faChevron} />
        </div>
    );
};

export default Arrow;
