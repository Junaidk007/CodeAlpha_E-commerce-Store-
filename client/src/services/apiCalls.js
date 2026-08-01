import axios from "axios";


const API = "http://localhost:5000/api"

export const registerUser = async (data) => {
    const response = await axios.post(
        `${API}/auth/signup`,
        data,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    return response.data;
};

export const loginUser = async (data) => {
    const response = await axios.post(
        `${API}/auth/signin`,
        data,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    return response.data;
};

export const getAllProducts = async () => {
    try {
        const response = await axios.get(
            `${API}/products`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (e) {
        throw new Error(
            e.response?.data?.message ||
            "Failed to fetch products"
        );
    }

}
export const getProductById = async (id) => {
    try {
        const response = await axios.get(
            `${API}/products/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (e) {
        throw new Error(
            e.response?.data?.message ||
            "Failed to fetch products"
        );
    }

}

export const addToCart = async (data, token) => {
    try {
        const response = await axios.post(
            `${API}/cart/add`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }
        );
        return response.data;
    } catch (e) {
        throw new Error(
            e.response?.data?.message ||
            "Failed to add to cart"
        );
    }

}

export const fetchCart = async (token) => {
    try {
        const response = await axios.get(
            `${API}/cart`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }
        );
        return response.data;
    } catch (e) {
        throw new Error(
            e.response?.data?.message ||
            "Failed to fetch cart"
        );
    }
}

export const updateCart = async (data, token) => {
    try {
        const response = await axios.put(
            `${API}/cart`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }
        );
        return response.data;
    } catch (e) {
        throw new Error(
            e.response?.data?.message ||
            "Failed to update cart"
        );
    }
}

export const deleteCartItem = async (data, token) => {
    try {
        const response = await axios.delete(
            `${API}/cart/remove`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                data,
            }
        );
        return response.data;
    } catch (e) {
        throw new Error(
            e.response?.data?.message ||
            "Failed to delete item from cart"
        );
    }
}