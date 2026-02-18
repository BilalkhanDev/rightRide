import api from "../../api/axios";

export const getAllVehicles = async (params) => {
  const response = await api.get("/vehicles", { params });
  return response.data;
};

export const updateVehicle = async (id, data) => {
  const response = await api.put(`/vehicles/${id}`, data);
  return response.data;
};
