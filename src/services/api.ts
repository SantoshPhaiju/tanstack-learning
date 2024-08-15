import axios from "axios";
import { ITodo } from "../types/todo";

const BASE_URL = "https://jsonplaceholder.typicode.com";
const axiosInstance = axios.create({baseURL: BASE_URL});


export const getTodosIds = async () => {
    return ((await axiosInstance.get<ITodo[]>('todos')).data.map((todo) => todo.id));
}


export const getTodoById = async (id: number) => {
    return (await axiosInstance.get<ITodo>(`todos/${id}`)).data;
}


export const createTodo = async (data: ITodo) => {
    return (await axiosInstance.post<ITodo>('todos', data));
}