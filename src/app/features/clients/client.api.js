import api from "../../api/axios";

export const createClient = async (payload) => {
  const response = await api.post("/clients", payload);
  return response.data;
};

export const getAllClients = async (params) => {
  const response = await api.get("/clients", { params });
  return response.data;
};

export const updateClient = async (id, payload) => {
  const response = await api.put(`/clients/${id}`, payload);
  return response.data;
};
