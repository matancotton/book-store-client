import React, { useEffect, useState } from "react";
import { getBooks } from "../../server/db";
import Books from "../books/BooksList";
import Filter from "../books/Filter";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [booksLength, setBooksLength] = useState(0);
    const [searchKey, setSearchKey] = useState("");
    const [isLoaderVisible, setIsLoaderVisible] = useState(false);

    useEffect(() => {
        setIsLoaderVisible(true);
        getBooks()
            .then((result) => {
                setBooks(result.books);
                setBooksLength(result.length);
                setIsLoaderVisible(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div className="home">
            <Filter
                setBooks={setBooks}
                setSearchKey={setSearchKey}
                setBooksLength={setBooksLength}
                setIsLoaderVisible={setIsLoaderVisible}
            />
            <Books
                booksLength={booksLength}
                setBooksLength={setBooksLength}
                books={books}
                setBooks={setBooks}
                searchKey={searchKey}
                isLoaderVisible={isLoaderVisible}
                setIsLoaderVisible={setIsLoaderVisible}
            />
        </div>
    );
};

export default Home;
