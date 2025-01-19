import axios from 'axios';

export const createApiCall = async (method, url, data = null) => {
    try {
        const response = await axios({
            method,
            url: `http://localhost:3000/api${url}`,
            data,
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error.response.data || error.message;
    }
};