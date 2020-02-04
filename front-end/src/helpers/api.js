import axios from 'axios';

export const signUpUser = (user) => {
    axios.post('/auth/register', user)
};

export const signInUser = (user) => {
    axios.get('/auth/register',user.id)
};