import axios from "axios";

export const getBooks = async () => {
    try {
        const result = await axios.get(
            process.env.REACT_APP_SERVER_URL + "/books"
        );
        return result.data;
    } catch (err) {
        throw err;
    }
};

export const getFilterdBooks = async (searchValue) => {
    try {
        const result = await axios.get(
            process.env.REACT_APP_SERVER_URL + "/books?" + searchValue
        );
        return result.data;
    } catch (err) {
        throw new Error(err.response.data.error);
    }
};

export const updateCartInDb = async (books, user) => {
    const booksIds = books.map((book) => book._id);
    try {
        return await axios.post(
            process.env.REACT_APP_SERVER_URL + "/my-cart/save",
            {
                books: booksIds,
            },
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
    } catch (err) {
        throw new Error(err.message);
    }
};

export const getMyCart = async (user) => {
    try {
        const result = await axios.get(
            process.env.REACT_APP_SERVER_URL + "/my-cart",
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
        return result.data;
    } catch (err) {
        throw err;
    }
};

export const addABookToDB = async (book, adminToken) => {
    try {
        const result = await axios.post(
            process.env.REACT_APP_SERVER_URL + "/books/new",
            { book },
            {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            }
        );

        return result.data;
    } catch (err) {
        throw new Error(err.message);
    }
};

export const editBookInDB = async (bookId, adminToken, updateData) => {
    try {
        const result = await axios.patch(
            process.env.REACT_APP_SERVER_URL + "/books/" + bookId,
            { ...updateData },
            {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            }
        );

        return result.data;
    } catch (err) {
        throw new Error(err.error.response.data.error);
    }
};

export const deleteBookInDB = async (bookId, adminToken) => {
    try {
        const result = await axios.delete(
            process.env.REACT_APP_SERVER_URL + "/books/" + bookId,
            {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            }
        );
        return result.data;
    } catch (err) {
        throw new Error(err.error.response.data.error);
    }
};
