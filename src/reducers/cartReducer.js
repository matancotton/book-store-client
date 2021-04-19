export const initialcartState = [];

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_BOOKS':
                return [...state.concat(action.books)]
        case 'EMPTY_CART':
                return [];
        case 'SET_BOOKS':
                return action.books
        default:
            return state;
    }
}

export default cartReducer;