import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

console.log("API_BASE_URL", API_BASE_URL);

export const loginApi = async (postData) => {
    try {
        const response = await api.post("/login", postData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const signupApi = async (postData) => {
    try {
        const response = await api.post("/signup", postData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const forgotPasswordApi = async (postData) => {
    try {
        const response = await api.post("/forgot_password", postData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const resetPasswordApi = async (postData) => {
    try {
        const response = await api.post("/reset_password", postData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
