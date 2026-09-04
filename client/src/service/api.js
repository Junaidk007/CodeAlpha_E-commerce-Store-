import axios from 'axios';

const API = axios.create({
    baseURL: 'https://codealpha-e-commerce-store-q4ln.onrender.com/api' || 'http://localhost:5000/api'
});

// Product routes
export const getProduct = () => {
    return API.get('/products');
};

export const getProductById = (id) => {
    return API.get(`/products/${id}`);
};

// Auth routes
export const signup = (userData) => {
    return API.post('/auth/signup', userData);
};

export const signin = (userData) => {
    return API.post('/auth/signin', userData);
};

// Cart routes
export const getCart = (token) => {
    return API.get('/cart', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const cartCount = (token) => {
    return API.get('/cart/count', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const addToCart = (token, cartData) => {
    return API.post('/cart/add', cartData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const updateCart = (token, cartData) => {
    return API.put('/cart', cartData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const deleteCartItem = (token, cartData) => {
    return API.delete('/cart/remove', {
        data: cartData,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};