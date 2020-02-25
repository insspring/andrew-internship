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

export const booksPagination = (token,page) => {
    return axios.get("/books?_page="+ page +"&_limit=10&", {
        headers: {
            'authorization': "bearer " + token
        },
    });
};
export const getBooks = (token,id,page) => {
    return axios.get("/books?authorId="+id+"&_page="+page+"&_limit=5&", {
        headers: {
            'authorization': "bearer " + token
        },
    });
};
export const getBook = (token,id) => {
    return axios.get("/books?id="+id, {
        headers: {
            'authorization': "bearer " + token
        },
    });
};
export const editBook = (id, data) => {
    return axios.put('/books/' + id, data);
};
