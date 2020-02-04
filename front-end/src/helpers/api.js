import axios from 'axios';

export const signUpUser = (user) => {
    return axios.post('/auth/register', user);
};

export const signInUser = (user) => {
    return axios.post('/auth/login', user);
};