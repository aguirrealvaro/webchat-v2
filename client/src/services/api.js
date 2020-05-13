import axios from "axios";
import { BASE_URL } from "../const";

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers['auth-token'] = `${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

export const registerUser = (dataRegister) =>
  api.post("/user/register", dataRegister);

export const loginUser = (dataLogin) => api.post("/user/login", dataLogin);

export const getUsers = () => api.get("/relation");

export const getChat = (id) => api.get(`/message/chat/${id}`);

export const postMessage = (dataMessage) => api.post("/message", dataMessage);

export const markAsRead = (idDestiny) =>
  api.put(`/message/mark-as-read/${idDestiny}`);
