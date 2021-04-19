import React, { useState } from "react";
import { getFilterdBooks } from "../../server/db";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SmallLoader from "../loaders/SmallLoader";

const Filter = ({
    setBooks,
    setSearchKey,
    setBooksLength,
    setIsLoaderVisible,
}) => {
    const onSubmitForm = (e) => {
        e.preventDefault();
        const searchValue = "value=" + e.target.children[0].value;
        setSearchKey(searchValue);
        setIsLoaderVisible(true);
        getFilterdBooks(searchValue).then((result) => {
            setBooks(result.books);
            setBooksLength(result.length);
            setIsLoaderVisible(false);
        });
    };
    return (
        <>
            <form className="filter-books" onSubmit={onSubmitForm}>
                <input type="text" placeholder="search for a book..." />
                <button className="search-button">
                    {<FontAwesomeIcon icon={faSearch} />}
                </button>
            </form>
        </>
    );
};

export default Filter;
