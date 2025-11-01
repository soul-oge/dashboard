import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/todo',
  withCredentials: true,
});

export const getAllTodo = () => api.get('/all');

export const createTodo = (data) => api.post('/create', data);

export const updateTodo = (id, data) => api.post(`/${id}`, data);

export const getTodoById = (id) => api.get(`/${id}`);

export const deleteTodo = (id) => api.delete(`/${id}`);