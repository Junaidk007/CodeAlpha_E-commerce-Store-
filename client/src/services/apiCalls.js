import axios from "axios";


const API ="http://localhost:5000/api"

export const registerUser = async (data) => {
    const response = await axios.post(
        `${API}/auth/signup`,
        data,
        {
            headers:{
                'Content-Type':'application/json',
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
            headers:{
                'Content-Type':'application/json',
            },
        }
    );

    return response.data;
};