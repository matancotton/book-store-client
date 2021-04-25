import React, { useEffect, useState } from "react";
import { getFilterdBooks } from "../../server/db";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Filter = ({
    setBooks,
    setSearchKey,
    setBooksLength,
    setIsLoaderVisible,
}) => {
    const [timer, setTimer] = useState(0);

    const onSubmitForm = (e) => {
        e.preventDefault();
        clearTimeout(timer);
        const searchValue = "value=" + e.target.children[0].value;
        filterBooks(searchValue);
    };

    const onChangedInput = (e) => {
        clearTimeout(timer);
        const searchValue = "value=" + e.target.value;
        setTimer(
            setTimeout(() => {
                filterBooks(searchValue);
            }, 1000)
        );
    };

    const filterBooks = (searchValue) => {
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
                <input
                    type="text"
                    placeholder="search for a book..."
                    onChange={onChangedInput}
                />
                <button className="search-button">
                    {<FontAwesomeIcon icon={faSearch} />}
                </button>
            </form>
        </>
    );
};

export default Filter;
