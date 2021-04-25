export const initialcartState = [];

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_BOOKS":
            return [...state.concat(action.books)];
        case "EMPTY_CART":
            return [];
        case "SET_BOOKS":
            return action.books;
        case "REMOVE_BOOK":
            return state.filter((book) => book.title !== action.book.title);
        case "DECREMENT_BOOK_COUNT":
            const stateCopy = [...state];
            for (const [index, book] of stateCopy.entries()) {
                if (book.title === action.book.title) {
                    stateCopy.splice(index, 1);
                    return stateCopy;
                }
            }
            return stateCopy;
        default:
            return state;
    }
};

export default cartReducer;
