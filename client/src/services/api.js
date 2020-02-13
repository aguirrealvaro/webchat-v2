import axios from "axios";
import { BASE_URL } from '../const'

const getAxiosClient = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: BASE_URL,
    headers: { "auth-token": token }
  });
};

export const registerUser = dataRegister => {
  const api = getAxiosClient();
  return api.post("/user/register", dataRegister);
};

export const loginUser = dataLogin => {
  const api = getAxiosClient();
  return api.post("/user/login", dataLogin);
};

export const getUsers = () => {
  const api = getAxiosClient();
  return api.get("/relation");
};

export const getChat = id => {
  const api = getAxiosClient();
  return api.get(`/message/chat/${id}`);
};

export const postMessage = dataMessage => {
  const api = getAxiosClient();
  return api.post("/message", dataMessage);
};

export const markAsRead = idDestiny => {
  const api = getAxiosClient();
  return api.put(`/message/mark-as-read/${idDestiny}`);
};
