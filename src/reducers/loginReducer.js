export const initialUserState = null;

const loginReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN': 
            return action.user;
        case 'LOGOUT':
            return null;
        default: 
            return state;
    }
}

export default loginReducer;