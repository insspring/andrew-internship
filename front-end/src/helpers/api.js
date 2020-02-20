import axios from 'axios';

export const signUpUser = (user) => {
    return axios.post('/auth/register', user);
};

export const signInUser = (user) => {
    return axios.post('/auth/login', user);
};
export const editUser = (id, data) => {
    return axios.put('/users/' + id, data);
};
export const getUser = (token) => {
    return axios.get('/users', {
        headers: {
            'authorization': "bearer " + token
        }
    })
};
export const addBook = (book) => {
    return axios.post('/books/add', book);
};
export const getBooks = (token) => {
    return axios.get('/books', {
        headers: {
            'authorization': "bearer " + token
        }
    });
};
export const booksPagination = (token,page,limit) => {
    return axios.get(`/books?_page=${page}&_limit=${limit}`, {
        headers: {
            'authorization': "bearer " + token
        },
    });
};