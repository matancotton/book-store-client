export const addBooks = (books) => ({
    type: 'ADD_BOOKS',
    books
});

export const setCart = (books) => ({
    type: 'SET_BOOKS',
    books
})

export const emptyCart = () =>({
    type: 'EMPTY_CART'
});

