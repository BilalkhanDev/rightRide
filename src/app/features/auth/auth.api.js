import api from "../../api/axios";

export const login = (payload) => api.post("/auth/login", payload);

export const signup = (payload) => api.post("/auth/signup", payload);

export const me = () => api.get("/auth/me");
