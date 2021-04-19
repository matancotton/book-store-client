export const adminLoginAction = (admin) => ({
    type: "LOGIN",
    admin,
});

export const adminLogoutAction = () => ({
    type: "LOGOUT",
});
