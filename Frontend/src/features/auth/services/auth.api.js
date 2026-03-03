import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function register(name, email, password) {
  const response = await api.post("/api/user/register", {
    name,
    email,
    password,
  });
  return response.data.user_info;
}

export async function login(email, password) {
  const response = await api.post("/api/user/login", { email, password });
  return response.data.user_info;
}

export async function getme() {
  const response = await api.get("/api/user/get-me");
  return response.data.user;
}

export async function logoutController(){
  const response = await api.get('/api/user/logout');
  return response.data.message;
}
