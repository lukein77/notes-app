import axios from 'axios';

const ENDPOINT = import.meta.env.VITE_API_BASE_URL;

export const getNotes = async (url) => {
    try {
        const response = await axios.get(`${ENDPOINT}/notes${url}`);
        return response.data;
    } catch (error) {
        throw(error);
    }
};

export const addNote = async ( note ) => {
    try {
        const response = await axios.post(`${ENDPOINT}/notes`, note);
        return response.data;
    } catch (error) {
        throw(error);
    }
}

export const updateNote = async (id, note) => {
    try {
        const response = await axios.put(`${ENDPOINT}/notes/${id}`, note);
        return response.data;
    } catch (error) {
        throw(error);
    }
};

export const deleteNote = async (id) => {
    try {
        const response = await axios.delete(`${ENDPOINT}/notes/${id}`);
        return response.data;
    } catch (error) {
        throw(error);
    }
};

export const archiveNote = async (id, value) => {
    try {
        const response = await axios.put(`${ENDPOINT}/notes/${id}/archive=${value}`);
        return response.data;
    } catch (error) {
        throw(error);
    }
} 

export const getCategories = async () => {
    try {
        const response = await axios.get(`${ENDPOINT}/categories`);
        return response.data;
    } catch (error) {
        throw(error);
    }
};