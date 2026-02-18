import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const getTodos = () => API.get("/todos");
export const createTodo = (data) => API.post("/todos", data);
export const updateTodo = (id, data) => API.put(`/todos/${id}`, data);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);
