export const initialAdminState = null;

const adminReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return action.admin;
        case "LOGOUT":
            return null;
        default:
            return state;
    }
};

export default adminReducer;
