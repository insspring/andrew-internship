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
export const addComment = (comment) => {
    return axios.post('/comments/add', comment);
};
export const booksPagination = (token,page) => {
    return axios.get("/books?_page="+ page +"&_limit=10&", {
        headers: {
            'authorization': "bearer " + token
        },
    });
};
export const commentsPagination = (token, id, page) => {
    return axios.get("/books/"+ id +"?_embed=comments&_page="+ page +"&_limit=10&", {
        headers: {
            'authorization': "bearer " + token
        },
    });
};
export const getComments = (token, id) => {
    return axios.get("/comments?bookId="+ id +"&_page=1&_limit=10&", {
        headers: {
            'authorization': "bearer " + token
        },
    });
};
export const getBooks = (token,id,page) => {
    return axios.get("/books?authorId="+id+"&_page="+page+"&_limit=10&", {
        headers: {
            'authorization': "bearer " + token
        },
    });
};
export const getFavorites = (token,id,page) => {
    return axios.get("/books?favorites_like="+id+"&_page="+page+"&_limit=10&", {
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
export const editComments = (id, data) => {
    return axios.put('/comments/' + id, data);
};