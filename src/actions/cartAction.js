export const addBooks = (books) => ({
    type: "ADD_BOOKS",
    books,
});

export const setCart = (books) => ({
    type: "SET_BOOKS",
    books,
});

export const removeBook = (book) => ({
    type: "REMOVE_BOOK",
    book,
});

export const decrementBookCountAction = (book) => ({
    type: "DECREMENT_BOOK_COUNT",
    book,
});

export const emptyCart = () => ({
    type: "EMPTY_CART",
});
